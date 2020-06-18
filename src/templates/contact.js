const templateContact = (name, email, phone, subject, message) => `
<div style="background-color: #90181B; padding: 30px; color: #FFFFFF">
  <h2>${name} deseja que a D'classe entre em contato</h2>
  <p style="color: #FFFFFF">
    <b>Nome: ${name}<br>Email: ${email}<br>Telefone: ${phone}<br>Assunto: ${subject}<br>Mensagem: ${message}</b>
  </p>
</div>
`
export default templateContact