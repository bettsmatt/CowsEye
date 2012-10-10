adminMenu = $ "#adminMenu"
logoutButton = $ "#logoutButton"
loginMenu = $ "#loginMenu"
loginButton = $ "#loginButton"
usernameInput = $ "#usernameInput"
passwordInput = $ "#passwordInput"
form_login = $ "form_login"

setCookie = (name, value) ->
	c_value = escape value
	c_name = escape name
	document.cookie = "#{c_name}=#{c_value};"
	console.log("Setting cookie to '#{c_name}=#{value};'")
	console.log "Cookies is '#{document.cookie}'"
	
getCookie = (name) ->
	cookies = document.cookie.split(";")
	console.log "cookies found #{cookies}"
	for c in cookies
		cookie = c.split "="
		if name == cookie[0]
			return unescape cookie[1]

isAdmin = () ->
	return getCookie("status") == "Admin"
	
setLogInControl = () ->
	if isAdmin()
		adminMenu.css {display: "block"} 
		loginMenu.css {display: "none"} 
	else
		adminMenu.css {display: "none"} 
		loginMenu.css {display: "block"} 

### Old Testing controls
logoutButton.click ->
	setCookie "status", "User"
	setLogInControl()
		
loginButton.click ->
	form_login.submit ->
	    alert "Done"
	
	setLogInControl()
###
	
# Check for the admin cookie and set the status...	
setLogInControl()

	
		

		
		
