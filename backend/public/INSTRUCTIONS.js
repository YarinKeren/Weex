// Tips & Tricks
// Use the isPublic to allow cloning the wap

// Focus on make it easy to demo over supporting full customization

// Support adding full-blown-component rather than letting the user add stuff manually

// (Delete is easy to implement later)
--- Delete component or WAP ?

// Support several themes for components (CSS only)

// default FLEX is your friend, handle media proprtion correctly

// Here are some components:
// WapHeader, WapFooter, WapContainer
// WapGallery (photos: {url, title,txt})
// WapMap (center,zoom,markers), 
// WapVideo (url, iframe) 
// WapSocial (social urls) 
// WapSubscribe => wapService
// WapChat
// WapContactUs => wapService
// WapNavbar
// WapSchedule
// WapSignature

// Edit Mode:
---- Editable components
// WapHeaderEdit / WapHeader
// WapSocialEdit / WapSocial

// Split work
?????????
// WapDetails : render the predefined JSON <pre>
   // WapHeader, WapMap (dummy - map-photo)
   // WapContainer
   // map => <DynamicCmp type={cmp.type} info={cmp.info} />


// WapEdit
// WapHeaderEdit
----- When in edit render only editable comps

  // Adding a component:
  // *. User select WapCmp from <select>
  // *. WapCmp is added at the bottom
  // *. Phase2: Let the user <select> After which WapCmp it should be added

  --- TODO
  // *. Phase3: Support adding inside a WapContainer

  // *. phase4: D&D (Later)

  ------- Ask 
  // *. add <select> for theme (themes are hard coded in wapService.getThemesFor(wapCmp.type))
  // Save button (Later on - save will be automatic)

// Homepage
  // render 3 waps links

  --- Support editing only clones of waps
  // support clone

// DASHBOARD
  // visits, contact-us, subscriptions
  // Google analytics VISION
  // Fake it until you make it

var wap = {
	"_id": "5e28393890dd7201a06d4e44",
	"name": "HairDresser Baluta Marketing Site",
	"imgUrl": "http://res.cloudinary.com/webify/image/upload/v1580021948/coffe_yi0yzf.png",
	"createdBy": {
		"_id": "5e26e0b718a0891d4c995527",
		"fullname": "Hekro Special",
		"imgUrl": "img.jpg",
	},
	"usersData": {
		"contacts" : [{"email": "user@user.com", "msg" :"Please send me stuff", "at": 123}],
		"subscriptions" : [{"email": "user@user.com", "at": 123}],
	},

	"cmps": [
		{
			"_id": "wc02",
			"type": "WapHeader",
			"info": {
				"title": "HairDresser Baluta",
				"substitle": "Your Hair is !(Who you Are)",
				"btn": {"label": "Schedule Today!", "link" : "#wc03"}
			},
			"theme": "theme-header-happy",
			"style": {
				"background": "url()",
				"font": "Fontush",
				"color": "red",
			}
		},
		{
			"_id": "wc01",
			"type": "WapMap",
			"info": {
				"name": "Paris",
				"lat": 12.909,
				"lng": 23.9,
				"zoom": 2
			},
			"theme": "theme-map-exciting",
			"style": {
				"height": "300px",
			}
		},		
		{
			"_id": "wc03",
			"type": "WapContainer",
			"info": {
				"dir": "row",
				"cmps": [
					{},
					{}
				]
			},
			"theme": "theme-container-base",
			"style": {
			}
		}
	],
	"isPublic" : true
}