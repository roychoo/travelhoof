/**
 * Handles Facebook interactions, specifically Login and Logout.
 *
 * When a user logs in, we display their profile picture and a list of Runs.
 */
Ext.define('TH.controller.Facebook', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox', 'TH.view.Login'],

    config: {
        control: {
            '#signout': {
                tap: 'onUserTap'
            },
            '#logoutButton': {
                tap: 'logout'
            },
            '#fbLogin': {
                tap: 'onFacebookLogin'
            }
        }
    },

    /**
     * Load the Facebook Javascript SDK asynchronously
     */
    init: function() {
        console.log("init facebook");
        window.fbAsyncInit = Ext.bind(this.onFacebookInit, this);

        (function(d){
            var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
    },

    onFacebookInit: function() {
        console.log("init facebook with App ID " + TH.app.facebookAppId);
        if (TH.app.facebookAppId === '') return;

        var me = this;

        FB.init({
            appId  : TH.app.facebookAppId,
            cookie : true
        });

        FB.Event.subscribe('auth.logout', Ext.bind(me.onLogout, me));

        FB.getLoginStatus(function(response) {

            clearTimeout(me.fbLoginTimeout);

            me.hasCheckedStatus = true;
            Ext.Viewport.setMasked(false);

           // Ext.get('splashLoader').destroy();
            //Ext.get('rwf-body').addCls('greyBg');
            Ext.fly('loading').destroy();
            if (response.status == 'connected') {
                me.onLogin();
            } else {
                me.login();
            }
        });

        me.fbLoginTimeout = setTimeout(function() {

            Ext.Viewport.setMasked(false);

            Ext.create('Ext.MessageBox', {
                title: 'Facebook Error',
                message: [
                    'Facebook Authentication is not responding. ',
                    'Please check your Facebook app is correctly configured, ',
                    'then check the network log for calls to Facebook for more information.',
                    'Restart the app to try again.'
                ].join('')
            }).show();

        }, 10000);
    },

    login: function() {
        Ext.Viewport.setMasked(false);
        var splash = Ext.getCmp('login');
        if (!splash) {
            Ext.Viewport.add({ xclass: 'TH.view.Login', id: 'login' });
        }
        //Ext.getCmp('login').showLoginText();
    },

    onLogin: function() {

        var me = this,
            errTitle;

        FB.api('/me', function(response) {

            if (response.error) {
                FB.logout();

                errTitle = "Facebook " + response.error.type + " error";
                Ext.Msg.alert(errTitle, response.error.message, function() {
                    me.login();
                });
            } else {
                TH.userData = response;
                if (!me.main) {
                    me.main = Ext.create('TH.view.Main', {
                        id: 'main'
                    });
                }
                Ext.Viewport.setActiveItem(me.main);
                console.log(FB.getUserID());

                Ext.getCmp('fbProfilePic').setData({
                    profileId: FB.getUserID()
                });
                //Ext.getStore('Runs').load();
            }
        });
    },

    logout: function() {
        Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Logging out...'});
        FB.logout();
    },

    /**
     * Called when the Logout button is tapped
     */
    onLogout: function() {

        if (!this.hasCheckedStatus) return;

        this.login();

        Ext.Viewport.setMasked(false);
        Ext.Viewport.setActiveItem(Ext.getCmp('login'));
        Ext.getStore('Runs').removeAll();

        this.logoutCmp.destroy();
    },

    /**
     * When the user profile picture is tapped, create a Logout button and pop it up next to the
     * avatar.
     */
    onUserTap: function(cmp) {

        if (!this.logoutCmp) {
            this.logoutCmp = Ext.create('Ext.Panel', {
                width: 120,
                top: 0,
                left: 0,
                padding: 5,
                modal: true,
                hideOnMaskTap: true,
                items: [
                    {
                        xtype: 'button',
                        id: 'logoutButton',
                        text: 'Logout',
                        ui: 'decline'
                    }
                ]
            });
        }

        this.logoutCmp.showBy(cmp);
    },
    // Redirect to Facebook when the user taps the Facebook Login button
    onFacebookLogin: function() {
        console.log('logging in' + this.redirectUrl());
        window.top.location = this.redirectUrl();
    },

     redirectUrl: function() {

        var redirectUrl = Ext.Object.toQueryString({
            redirect_uri: this.currentLocation(),
            client_id: TH.app.facebookAppId,
            scope: 'publish_actions,share_item'
        });

     //   if (!Ext.os.is.Android && !Ext.os.is.iOS && /Windows|Linux|MacOS/.test(Ext.os.name)) {
       //     return "https://www.facebook.com/dialog/oauth?" + redirectUrl;
       // } else {
            return "https://m.facebook.com/dialog/oauth?" + redirectUrl;
        //}
    },

    currentLocation: function() {
        if (window.top.location.host) {
            return window.top.location.protocol + "//" + window.top.location.host + window.top.location.pathname
        } else {
            return window.location.protocol + "//" + window.location.host + window.location.pathname
        }
    },

});
