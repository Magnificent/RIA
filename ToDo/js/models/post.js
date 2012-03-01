define([
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
], function (_, Backbone) {
    var postModel = Backbone.Model.extend({
        defaults: {
            Text: "Kom ih�g",
            Prio: 1,
            Date: Date,
            Tag: "None"
        }
    });

    return postModel;
});