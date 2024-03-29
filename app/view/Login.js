Ext.define('TH.view.Login', {
	extend: 'Ext.Container',

	xtype: 'login',

	config: {

		layout: 'fit',
		cls: 'login',

		items: [
			{
				xtype: 'container',
				layout: {
					type: 'vbox',
					align: 'center'
				},
				cls: 'loginScreen',
				items: [
		            {
		                xtype: 'button',
		                text: 'Login with Facebook',
		                id: 'fbLogin',
		                cls: 'fbLogin'
		            // },
		            // {
		            // 	xtype: 'component',
		            // 	id: 'facePile',
		            // 	html: '<div class="fb-facepile" data-app-id="358904677456171" data-max-rows="1" data-width="220" data-colorscheme="dark"></div>'
					}
				]
			}
		]
	}
});
