import { addObserver, unObserver } from './resizeObserver';

function typeIsObject(obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0] === 'Object';
}

function typeIsBoolean(obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0] === 'Boolean';
}
/**
* a plugins manager to register and search
**/


var pluginsManager = {
  init: function init(player) {
    // mark every player instance by _pluginInfoId
    var cgid = player._pluginInfoId;

    if (!cgid) {
      cgid = new Date().getTime();
      player._pluginInfoId = cgid;
    }

    if (!this.pluginGroup) {
      this.pluginGroup = {};
    }

    !player.config.closeResizeObserver && addObserver(player.root, function () {
      player.resize();
    });
    this.pluginGroup[cgid] = {
      _player: player,
      _originalOptions: player.config || {}
    };
  },

  /**
   * Check whether there is a player instance in the current dom
   * @param {Element} root
   */
  checkPlayerRoot: function checkPlayerRoot(root) {
    if (this.pluginGroup) {
      var _keys = Object.keys(this.pluginGroup);

      for (var i = 0; i < _keys.length; i++) {
        var _p = this.pluginGroup[_keys[i]]._player;

        if (_p.root === root) {
          return _p;
        }
      }

      return null;
    }

    return null;
  },

  /**
   * register a lazy plugin
   * @param { any } player instance
   * @param { any } lazyPlugin config
   *
   */
  lazyRegister: function lazyRegister(player, lazyPlugin) {
    var _this = this;

    var timeout = lazyPlugin.timeout || 1500;
    return Promise.race([lazyPlugin.loader().then(function (plugin) {
      var result;

      if (plugin && plugin.__esModule) {
        result = plugin.default;
      } else {
        result = plugin;
      }

      _this.register(player, result, plugin.options);
    }), new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('timeout'));
      }, timeout);
    })]);
  },

  /**
  * register a Plugin
  * @param { any } player the plugins register
  * @param { any } plugin the plugin contructor
  * @param { any } options the plugin configuration
  * @return { any } Plugin the plugin instance
  **/
  register: function register(player, plugin) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!player || !plugin || typeof plugin !== 'function' || plugin.prototype === undefined) {
      return;
    }

    var cgid = player._pluginInfoId;

    if (!cgid || !this.pluginGroup || !this.pluginGroup[cgid]) {
      this.init(player);
      cgid = player._pluginInfoId;
    }

    if (!this.pluginGroup[cgid]._plugins) {
      this.pluginGroup[cgid]._plugins = [];
    }

    var plugins = this.pluginGroup[cgid]._plugins;
    var originalOptions = this.pluginGroup[cgid]._originalOptions;
    options.player = this.pluginGroup[cgid]._player;
    var pluginName = options.pluginName || plugin.pluginName;

    if (!pluginName) {
      throw new Error('The property pluginName is necessary');
    }

    if (plugin.isSupported && !plugin.isSupported()) {
      console.warn("not supported plugin [".concat(pluginName, "]"));
      return;
    }

    if (!options.config) {
      options.config = {};
    } // get config items from player.config


    var keys = Object.keys(originalOptions);

    for (var i = 0; i < keys.length; i++) {
      if (pluginName.toLowerCase() === keys[i].toLowerCase()) {
        var config = originalOptions[keys[i]];

        if (typeIsObject(config)) {
          options.config = Object.assign({}, options.config, originalOptions[keys[i]]);
        }

        if (typeIsBoolean(config)) {
          options.config.disable = !config;
        }

        break;
      }
    } // copy the default configuration items of the plugin


    if (plugin.defaultConfig) {
      Object.keys(plugin.defaultConfig).map(function (key) {
        if (typeof options.config[key] === 'undefined') {
          options.config[key] = plugin.defaultConfig[key];
        }
      });
    } // get the parent dom which added the plugin will be mounted


    if (!options.root) {
      options.root = player.root;
    } else if (typeof options.root === 'string') {
      options.root = player[options.root];
    }

    options.index = options.config.index || 0;

    try {
      // if there is already a plugin instance with the same pluginName, destroy it
      if (plugins[pluginName.toLowerCase()]) {
        this.unRegister(cgid, pluginName.toLowerCase());
        console.warn("the is one plugin with same pluginName [".concat(pluginName, "] exist, destroy the old instance"));
      } // eslint-disable-next-line new-cap


      var _instance = new plugin(options);

      plugins[pluginName.toLowerCase()] = _instance;
      plugins[pluginName.toLowerCase()].func = plugin;

      if (_instance && typeof _instance.afterCreate === 'function') {
        _instance.afterCreate();
      }

      return _instance;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  /**
   * Unregister a plugin from player instance
   * @param { string } cgid
   * @param { string } name
   */
  unRegister: function unRegister(cgid, name) {
    if (cgid._pluginInfoId) {
      cgid = cgid._pluginInfoId;
    }

    name = name.toLowerCase();

    try {
      var plugin = this.pluginGroup[cgid]._plugins[name];

      if (plugin) {
        plugin.pluginName && plugin.__destroy();
        delete this.pluginGroup[cgid]._plugins[name];
      }
    } catch (e) {
      console.error("[unRegister:".concat(name, "] cgid:[").concat(cgid, "] error"), e);
    }
  },

  /**
   * remove a plugin instance from the player plugin list
   * @param { any } player
   * @param { string } name
   */
  deletePlugin: function deletePlugin(player, name) {
    var cgid = player._pluginInfoId;

    if (cgid && this.pluginGroup && this.pluginGroup[cgid] && this.pluginGroup[cgid]._plugins) {
      var _plugins = this.pluginGroup[cgid]._plugins;
      delete _plugins[name];
    }
  },

  /**
   * get all plugin instance of player
   * @param { any } player
   */
  getPlugins: function getPlugins(player) {
    var cgid = player._pluginInfoId;
    return cgid ? this.pluginGroup[cgid]._plugins : {};
  },
  findPlugin: function findPlugin(player, name) {
    var cgid = player._pluginInfoId;

    if (!this.pluginGroup || !cgid) {
      return null;
    }

    var cName = name.toLowerCase();
    return this.pluginGroup[cgid]._plugins[cName];
  },
  beforeInit: function beforeInit(player) {
    var _this2 = this;

    function retPromise(fun) {
      if (!fun || !fun.then) {
        return new Promise(function (resolve) {
          resolve();
        });
      } else {
        return fun;
      }
    }

    return new Promise(function (resolve) {
      if (!_this2.pluginGroup) {
        return;
      }

      var prevTask;

      if (player._loadingPlugins && player._loadingPlugins.length) {
        prevTask = Promise.all(player._loadingPlugins);
      } else {
        prevTask = Promise.resolve();
      }

      return prevTask.then(function () {
        var cgid = player._pluginInfoId;

        if (!_this2.pluginGroup[cgid]) {
          resolve();
          return;
        }

        var plugins = _this2.pluginGroup[cgid]._plugins;
        var pluginsRet = [];

        for (var _i = 0, _Object$keys = Object.keys(plugins); _i < _Object$keys.length; _i++) {
          var item = _Object$keys[_i];

          if (plugins[item] && plugins[item].beforePlayerInit) {
            try {
              var ret = plugins[item].beforePlayerInit();
              pluginsRet.push(retPromise(ret));
            } catch (e) {
              pluginsRet.push(retPromise(null));
              throw e;
            }
          }
        }

        Promise.all([].concat(pluginsRet)).then(function () {
          resolve();
        }).catch(function (e) {
          console.error(e);
          resolve();
        });
      });
    });
  },
  afterInit: function afterInit(player) {
    var cgid = player._pluginInfoId;

    if (!this.pluginGroup || !cgid) {
      return;
    }

    var plugins = this.pluginGroup[cgid]._plugins;

    for (var _i2 = 0, _Object$keys2 = Object.keys(plugins); _i2 < _Object$keys2.length; _i2++) {
      var item = _Object$keys2[_i2];

      if (plugins[item] && plugins[item].afterPlayerInit) {
        plugins[item].afterPlayerInit();
      }
    }
  },
  setLang: function setLang(lang, player) {
    var cgid = player._pluginInfoId;

    if (!this.pluginGroup || !cgid) {
      return;
    }

    var plugins = this.pluginGroup[cgid]._plugins;
    Object.keys(plugins).map(function (item) {
      if (plugins[item].updateLang) {
        plugins[item].updateLang(lang);
      } else {
        // 兼容旧版本通过set lang更新语言的问题
        try {
          plugins[item].lang = lang;
        } catch (error) {
          console.warn("".concat(item, " setLang"));
        }
      }
    });
  },
  reRender: function reRender(player) {
    var cgid = player._pluginInfoId;

    if (!cgid) {
      return;
    }

    var pluginsMap = {};
    var plugins = this.pluginGroup[cgid]._plugins;

    for (var _i3 = 0, _Object$keys3 = Object.keys(plugins); _i3 < _Object$keys3.length; _i3++) {
      var item = _Object$keys3[_i3];
      pluginsMap[item] = {
        plugin: plugins[item].func,
        options: plugins[item]._args
      };
      this.unRegister(cgid, item);
    }

    for (var _i4 = 0, _Object$keys4 = Object.keys(pluginsMap); _i4 < _Object$keys4.length; _i4++) {
      var _item = _Object$keys4[_i4];
      this.register(cgid, _item, pluginsMap[_item].plugin, pluginsMap[_item].options);
    }
  },
  onPluginsReady: function onPluginsReady(player) {
    var cgid = player._pluginInfoId;
    var plugins = this.pluginGroup[cgid]._plugins;

    if (!cgid || !plugins) {
      return;
    }

    Object.keys(plugins).map(function (key) {
      if (plugins[key].onPluginsReady && typeof plugins[key].onPluginsReady === 'function') {
        plugins[key].onPluginsReady();
      }
    });
  },
  destroy: function destroy(player) {
    var cgid = player._pluginInfoId;

    if (!this.pluginGroup[cgid]) {
      return;
    }

    unObserver(player.root);
    var plugins = this.pluginGroup[cgid]._plugins;

    for (var _i5 = 0, _Object$keys5 = Object.keys(plugins); _i5 < _Object$keys5.length; _i5++) {
      var item = _Object$keys5[_i5];
      this.unRegister(cgid, item);
    }

    delete this.pluginGroup[cgid];
    delete player._pluginInfoId;
  }
};
export default pluginsManager;