describe("Testing the travelopia application", () => {
  //for checking it can visit the home page successfully or not
  it("should load the form page at first", () => {
    cy.visit("http://localhost:3000/");
  });

  // to check user can fill the form without any problem or not

  it("Fills out the form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid=name]").type("John Doe");
    cy.get("[data-testid=email]").type("john@example.com");
    cy.get("[data-testid=destination]").select("India");
    cy.get("[data-testid=totalTravellers]").type("5");
    cy.get("[data-testid=budget]").type("500");
  });

  // for post a form to check it responds correctly or not

  it("Posting the form", () => {
    cy.visit("http://localhost:3000/");
    cy.intercept("POST", "http://localhost:8080/booking", {
      statusCode: 200,
      body: "booking successfull",
    }).as("postRequest");

    cy.get("form").submit();

    cy.wait("@postRequest").then((interception) => {
      const { request, response } = interception;

      expect(request.method).to.eq("POST");
      expect(request.url).to.eq("http://localhost:8080/booking");
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.eq("booking successfull");
    });
  });

  // to check when clicking on navigate it moves to /dashboard or not

  it("should navigate to dasboard when click to dashboard button", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid=dashboard]").click();
    cy.url().should("include", "/dashboard");
  });

  // to check dashboard is visible or not
  it("should visit dashboard page", () => {
    cy.visit("http://localhost:3000/dashboard");
  });

  // to check on dashboard we getting all the data or not
  it("should load data on dashboard page", () => {
    cy.intercept("GET", "http://localhost:8080/booking?page=1", {
      body: {
        allBookings: [
          {
            _id: 55,
            name: "krishan",
            email: "krishan@gmail.com",
            destination: "Europe",
            totalTravellers: 23,
            budget: 100000,
            createdAt: Date.now(),
          },
        ],
        total: [
          {
            _id: 55,
            name: "krishan",
            email: "krishan@gmail.com",
            destination: "Europe",
            totalTravellers: 23,
            budget: 100000,
            createdAt: Date.now(),
          },
        ],
      },
    }).as("getAllRequest");
    cy.visit("http://localhost:3000/dashboard");
    cy.wait("@getAllRequest").then((interception) => {
      const { request, response } = interception;

      expect(request.method).to.eq("GET");
      expect(request.url).to.eq("http://localhost:8080/booking?page=1");
      response.body.allBookings[0].name = "krishan";
    });
  });
});
