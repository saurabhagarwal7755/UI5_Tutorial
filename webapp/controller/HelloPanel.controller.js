sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
        onShowHello: function () {
            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },
        onOpenDialog: function () {
            var oView = this.getView();

            //crate a dialog
            if (!this.byId("helloDialog")) {
                //load asynchronous XML
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.HelloDialog",
                    controller: this
                }).then(function (oDialog) {
                    //connect dialog to root view
                    oView.addDependent(oDialog);
                    oDialog.open();
                })
            } else {
                this.byId("helloDialog").open();
            }
        },
        onCloseDialog: function () {
            this.byId("helloDialog").close();
        }
    });
});