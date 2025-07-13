describe('Flujo: Login y Agregar Gasto', () => {
  it('login y agregar un gasto', () => {
    // 1. Ir a la página de login
    cy.visit('http://localhost:8100');

    // 2. Completar el formulario de login
    cy.get('input[formcontrolname="email"]').type('test@test.com');
    cy.get('input[formcontrolname="password"]').type('test1234');
    cy.get('button[type="submit"]').contains('Iniciar sesión').click();

    // 3. Ir al formulario de agregar gasto
    cy.contains('Agregar nuevo gasto').click();

    // 4. Llenar el formulario de gasto
    cy.get('mat-select[formcontrolname="currency"]').click();
    cy.get('mat-option').contains('CLP').click();
    cy.get('input[formcontrolname="monto"]').type('1500');
    cy.get('mat-select[formcontrolname="categoria"]').click();
    cy.get('mat-option').contains('Comida').click();
    cy.get('input[formcontrolname="descripcion"]').type('Café', { force: true });
    cy.get('mat-select[formcontrolname="quien"]').click();
    cy.get('mat-option').contains('Tú').click();

    // 5. Enviar el formulario
    cy.get('button[type="submit"]').contains('Guardar gasto').click();
  });
});
