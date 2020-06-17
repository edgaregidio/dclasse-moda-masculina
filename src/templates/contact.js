const templateContact = (name, email, phone, subject, message) => `
<div style="background-color: #e9c9e9; padding: 30px; color: #00000">
  <h2>${name} deseja que a D'classe entre em contato</h2>
  <p style="color: #00000">
    <b>Nome: ${name}<br>Email: ${email}<br>Telefone: ${phone}<br>Assunto: ${subject}<br>Mensagem: ${message}</b>
  </p>
</div>
`
export default templateContact