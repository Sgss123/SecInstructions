export default pluginsManager;
declare namespace pluginsManager {
    function init(player: any): void;
    function init(player: any): void;
    /**
     * Check whether there is a player instance in the current dom
     * @param {Element} root
     */
    function checkPlayerRoot(root: Element): any;
    /**
     * Check whether there is a player instance in the current dom
     * @param {Element} root
     */
    function checkPlayerRoot(root: Element): any;
    /**
     * register a lazy plugin
     * @param { any } player instance
     * @param { any } lazyPlugin config
     *
     */
    function lazyRegister(player: any, lazyPlugin: any): Promise<any>;
    /**
     * register a lazy plugin
     * @param { any } player instance
     * @param { any } lazyPlugin config
     *
     */
    function lazyRegister(player: any, lazyPlugin: any): Promise<any>;
    /**
    * register a Plugin
    * @param { any } player the plugins register
    * @param { any } plugin the plugin contructor
    * @param { any } options the plugin configuration
    * @return { any } Plugin the plugin instance
    **/
    function register(player: any, plugin: any, options?: any): any;
    /**
    * register a Plugin
    * @param { any } player the plugins register
    * @param { any } plugin the plugin contructor
    * @param { any } options the plugin configuration
    * @return { any } Plugin the plugin instance
    **/
    function register(player: any, plugin: any, options?: any): any;
    /**
     * Unregister a plugin from player instance
     * @param { string } cgid
     * @param { string } name
     */
    function unRegister(cgid: string, name: string): void;
    /**
     * Unregister a plugin from player instance
     * @param { string } cgid
     * @param { string } name
     */
    function unRegister(cgid: string, name: string): void;
    /**
     * remove a plugin instance from the player plugin list
     * @param { any } player
     * @param { string } name
     */
    function deletePlugin(player: any, name: string): void;
    /**
     * remove a plugin instance from the player plugin list
     * @param { any } player
     * @param { string } name
     */
    function deletePlugin(player: any, name: string): void;
    /**
     * get all plugin instance of player
     * @param { any } player
     */
    function getPlugins(player: any): any;
    /**
     * get all plugin instance of player
     * @param { any } player
     */
    function getPlugins(player: any): any;
    function findPlugin(player: any, name: any): any;
    function findPlugin(player: any, name: any): any;
    function beforeInit(player: any): Promise<any>;
    function beforeInit(player: any): Promise<any>;
    function afterInit(player: any): void;
    function afterInit(player: any): void;
    function setLang(lang: any, player: any): void;
    function setLang(lang: any, player: any): void;
    function reRender(player: any): void;
    function reRender(player: any): void;
    function onPluginsReady(player: any): void;
    function onPluginsReady(player: any): void;
    function destroy(player: any): void;
    function destroy(player: any): void;
}
