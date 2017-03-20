describe('Stage Plugin test cases', function() {

    beforeEach(function(done) {
        var themeData = {
            canvasId: "canvas",
            startStage: "splash",
            manifest: {
                media: [
                    { id: 'sringeri', src: 'sringeri.png', type: 'image' },
                    { id: 'splash_audio', src: 'splash.ogg', type: 'audio' }
                ]
            },
            stage: [
                { id: "splash", extends: "splash1", audio: { asset: 'splash_audio' }, img: { asset: 'sringeri' }, iterate: "assessment", var: "item" },
                { id: "splash1", audio: { asset: 'splash_audio' }, img: { asset: 'sringeri' } },
                { id: "splash2", audio: { asset: 'splash_audio' }, img: { asset: 'sringeri' } }
            ],
            controller: [
                { name: "assessment", type: "items", id: "assessment" }
            ]
        }
        setFixtures('<div id="gameArea"><canvas id="gameCanvas" width="1366" height="768"></canvas></div>');
        var parent = {
            dimensions: function() {
                return {
                    x: 0,
                    y: 0,
                    w: 500,
                    h: 500
                }
            },
            addChild: function() {}
        }
        var data = data || {

            id: "splash1",
            audio: { asset: 'splash_audio' },
            img: { asset: 'sringeri' }

        }
        this.theme = new ThemePlugin(themeData);
        this.theme.start('js/test/assets/');
        this.plugin = PluginManager.invoke('stage', data, parent, "splash", this.theme);
        spyOn(this.plugin, 'setParamValue').and.callThrough();
        spyOn(this.plugin, 'addController').and.callThrough();
        spyOn(this.plugin, 'getController').and.callThrough();
        spyOn(this.plugin, 'getTemplate').and.callThrough();
        spyOn(this.plugin, 'getModelValue').and.callThrough();
        spyOn(this.plugin, 'setModelValue').and.callThrough();

        spyOn(this.plugin, 'setParam').and.callThrough();
        spyOn(this.plugin, 'getParam').and.callThrough();
        done();
    });

    xit('Stage plugin initPlugin', function() {
        expect(true).toEqual(this.plugin._self instanceof creatine.Scene);
    });

    xit('Stage attributes validation', function() {
        expect(this.plugin._self.x).toBeDefined();
        expect(this.plugin._self.y).toBeDefined();
        expect(this.plugin._self.x).not.toBeNull();
        expect(this.plugin._self.y).not.toBeNull();
        expect(this.plugin._self.id).toBeDefined();
        expect(this.plugin._self.id).not.toBeNull();
        expect(this.plugin._self.w).not.toBeNull();
        expect(this.plugin._self.h).not.toBeNull();

    });
    xit("Stage extend attribute validation", function() {
        expect(this.plugin._self.extend).not.toBeNull();

    });
    xit('Stage plugin setParamValue', function() {
        this.plugin.setParamValue({id:"stage"});
        expect(this.plugin.setParamValue).toHaveBeenCalled();
        expect(this.plugin.setParamValue.calls.count()).toEqual(1);
    });
    xit('Stage plugin add controller', function() {
        this.plugin.addController( {'ev-if':"stage.param2 "});
        expect(this.plugin.addController).toHaveBeenCalled();
        expect(this.plugin.addController.calls.count()).toEqual(1);
    });
    xit('stage plugin getController', function() {
        this.plugin.getController({name:"assessment"});
        expect(this.plugin.getController).toHaveBeenCalled();
        expect(this.plugin.getController.calls.count()).toEqual(1);

    });
    xit('stage plugin getTemplate', function() {

        this.plugin.getTemplate("x");
        expect(this.plugin.getTemplate).toHaveBeenCalled();
        expect(this.plugin.getTemplate.calls.count()).toEqual(1);

    });

    xit('stage plugin getModelValue', function() {

        this.plugin.getModelValue();
        expect(this.plugin.getModelValue).toHaveBeenCalled();
        expect(this.plugin.getModelValue.calls.count()).toEqual(1);

    });
    xit('stage plugin setModelValue', function() {

        this.plugin.setModelValue();
        expect(this.plugin.setModelValue).toHaveBeenCalled();
        expect(this.plugin.setModelValue.calls.count()).toEqual(1);

    });


    xit('stage plugin setParam', function() {

        this.plugin.setParam("x", 10, 10, 20);
        expect(this.plugin.setParam).toHaveBeenCalled();
        expect(this.plugin.setParam.calls.count()).toEqual(1);

    });

    xit('stage plugin getParam', function() {

       this.plugin.getParam(['param-name']);
        expect(this.plugin.getParam).toHaveBeenCalled();
        expect(this.plugin.getParam.calls.count()).toEqual(1);

    });

});
