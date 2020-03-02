"use strict"

const inputField = ({
    icon, 
    placeholder
}) => [ `<div class="w3-row w3-section">`, 
            `<div class="w3-col" style="width:50px"><i class="w3-xxlarge ${icon}"></i></div>`, 
            `<div class="w3-rest">`, 
            `<input class="w3-input w3-border" name="first" type="text" placeholder="${placeholder}">`, 
            `</div>`, 
        `</div>` ].join('')


const userNameInput = inputField({
    icon: 'fa fa-user', 
    placeholder: 'Member Name or Email'
})

const emailInput = inputField({
    icon:           'fa fa-envelope-o', 
    placeholder:    'Password'
})
 
const loginForm = [
    `<form>`, 
    `${userNameInput}`, 
    `${emailInput}`,
    `<button class="w3-button w3-block w3-section w3-ripple w3-padding">Come in</button>`, 
    `</form>`
    ].join('')

const addLoginFeature = function( app ){

    app.showLogin = x => app.ui.showModal({
        title   : 'Login', 
        content : loginForm 
    })

    $('#btnLogin').click( event => {
        event.preventDefault()
        app.showLogin( )
    })

    app.addFeature({
        label: 'login'
    })
    return app
}

module.exports = {
    addLoginFeature, 
}