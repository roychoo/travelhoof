Ext.define('TH.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {

        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                cls: 'small withBg',
                title: '<div class="headerTitle"></div>',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        allowDepress: false,
                        items: [
                            {
                                cls: 'movies',
                                iconCls: 'movies',
                                pressed: true
                            },
                            {
                                xtype: 'button',
                                cls: 'friends',
                                iconCls: 'friends'
                            }
                        ]
                    },
                    {    xtype: 'spacer'    },
                    /*{
                        xtype: 'button',
                        cls: 'searchBtn',
                        iconCls: 'search'
                    },*/
                    {
                        xtype: 'component',
                        cls: 'fbProfilePic',
                        id: 'fbProfilePic',
                        tpl: '<img src="https://graph.facebook.com/{profileId}/picture?type=square" />'
                    }
                ]
            }
        ]
        /*tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: 'Get Started',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }
        ]*/
    }
});
