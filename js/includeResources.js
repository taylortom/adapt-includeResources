define(function(require) {

	var Adapt = require('coreJS/adapt');

	Adapt.on('router:page', function (model) {
		_.defer(function() {
			
			// Loop through components, search for included resources
			// and replace with link to resources
			var myComponents = Adapt.components.models;
			for (var i=0; i<myComponents.length; i++) {
				myComponents[i].set('body', updateLink(myComponents[i].get('body'));
			}
		});
	});
		
	// Method checks the argument text for any ids of included resources
	// and replaces with path to asset
	function updateLink(text) {
	
		// Find all anchors in argument text and store resource links
		// for comparison to ids of included resources
		var returnText = text;
		var resourceLinks = [];
		text.replace(/[^<]*(<a href="([^"]+)[^>]([^<]+)<\/a>)/g, function () {
			resourceLinks.push(arguments[2]);
		});
		
		// Loop through all resource links and update with a link to the resource
		for (var i=0; i<resourceLinks.length; i++) {
			var link = getLink(resourceLinks[i]);
			if (link != null) {
				returnText = returnText.replace(resourceLinks[i], link);
			} else {
				console.log("adapt-includeResources: link not found for id: " + resourceLinks[i]);
			}
		}
				
		return returnText;
	}
	
	// Method searches for the argument id in included resources and returns
	// the resource path if found.
	function getLink(id) {
		var returnValue = null;
		var resources = Adapt.course.get('_includeResources')._items;
		for (i=0; i<resources.length; i++) {
			if (id === resources[i].id) {
				returnValue = resources[i].resource;
				break;
			}
		}
		
		return returnValue;
	}

});	