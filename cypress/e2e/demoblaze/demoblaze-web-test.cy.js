describe('Demoblaze Web Testing', () => {

  it('Successful order flow', () => {
    cy.visit('https://demoblaze.com/index.html')
    cy.wait(50)
    cy.screenshot(); //0
    // click link text login
    cy.get("[data-target='#logInModal']").click()
    cy.get("[onclick='logIn()']").should('be.visible')
    cy.wait(100)
    cy.screenshot(); //1
    // fill username & password
    cy.get('#loginusername').type('wibowo.bullseye').should('have.value', 'wibowo.bullseye')
    cy.get('#loginpassword').type('bullseye').should('have.value', 'bullseye')
    cy.screenshot(); //2
    // click button login
    cy.get("[onclick='logIn()']").click()
    
    // assert homescreen
    cy.get('#nameofuser').should('contain', 'wibowo.bullseye')
    cy.screenshot(); //3
    //select an item
    cy.get('#tbodyid > div:nth-of-type(5) .hrefch').click()
   
    cy.get('.name').should('contain', 'Iphone 6 32gb')

    //add to cart
    cy.get('.btn-success').click()
    cy.screenshot(); //4
    //Confirm alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    cy.on('window:confirm', () => true)
    cy.get('#cartur').click() 

    //assert page
    cy.location("pathname").should("eq", "/cart.html")
    //assert item
    cy.get('td:nth-of-type(2)').should('contain', 'Iphone 6 32gb')
    cy.screenshot();//5
    //Place order
    cy.get('.btn-success').should('be.visible').click()
    

    cy.get("[onclick='purchaseOrder()']").should('be.visible')
    cy.screenshot(); //6
    cy.get('#name').type('Wibowo').should('have.value', 'Wibowo')
    cy.get('#country').type('Indonesia').should('have.value', 'Indonesia')
    cy.get('#city').type('Depok').should('have.value', 'Depok')
    cy.get('#card').type('1234-5678-1234-5678').should('have.value', '1234-5678-1234-5678')
    cy.get('#month').type('9').should('have.value', '9')
    cy.get('#year').type('23').should('have.value', '23')
    cy.screenshot(); //7
    cy.get("[onclick='purchaseOrder()']").click()

    cy.get('.sweet-alert > h2').should('be.visible').should('contain', 'Thank you for your purchase!')
    //cy.get('.confirm').click()
    cy.screenshot(); //8
    //logout
    cy.visit('https://demoblaze.com/index.html')
    cy.get("[onclick='logOut()']").click()
    

    cy.get("[data-target='#logInModal']").should('be.visible')
    cy.screenshot(); //9
  });

  it('Successful contact email', () => {
    cy.visit('https://demoblaze.com/index.html')
    cy.wait(50)
    // click link text login
    cy.get("[data-target='#logInModal']").click()
    cy.get("[onclick='logIn()']").should('be.visible')
    cy.wait(100)
    // fill username & password
    cy.get('#loginusername').click().type('wibowo.bullseye').should('have.value', 'wibowo.bullseye')
    cy.get('#loginpassword').type('bullseye').should('have.value', 'bullseye')
    // click button login
    cy.get("[onclick='logIn()']").click()
    
    // assert homescreen
    cy.get('#nameofuser').should('contain', 'wibowo.bullseye')

    //click contact menu
    cy.get("[data-target='#exampleModal']").click()
    cy.get("[onclick='send()']").should('be.visible')

    //fill in form
    cy.get('#recipient-email').click().type('random@email.com').should('have.value', 'random@email.com')
    cy.get('#recipient-name').type('Random User').should('have.value', 'Random User')
    cy.get('#message-text').type('Hello, Random User!').should('have.value', 'Hello, Random User!')

    //send message
    cy.get("[onclick='send()']").click()

    //Confirm alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Thanks for the message!!')
    })
    cy.on('window:confirm', () => true)
  });
});