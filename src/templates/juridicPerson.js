const templatePhysicalPerson = (name, reason, cnpj, subscription, address, neighborhood, city, state, phone, ref1, telRef1, ref2, telRef2, ref3, telRef3, email) => `
<div style="background-color: #90181B; padding: 30px; color: #FFFFFF">
  <h2>${name} acabou de cadastrar-se na plataforma</h2>
  <p style="color: #FFFFFF">
    <b>Nome: ${name}<br>CNPJ: ${cnpj}<br>Razão Social: ${reason}<br>Inscrição Estadual: ${subscription}<br>Endereço: ${address}<br>
        Bairro: ${neighborhood}<br>Cidade: ${city}<br>Estado: ${state}<br>Telefone: ${phone}<br>
        Referência Comercial 1: ${ref1}<br>Telefone Referência Comercial 1: ${telRef1}<br>
        Referência Comercial 2: ${ref2}<br>Telefone Referência Comercial 2: ${telRef2}<br>
        Referência Comercial 3: ${ref3}<br>Telefone Referência Comercial 3: ${telRef3}<br>Email: ${email}
    </b>
  </p>
</div>
`
export default templatePhysicalPerson