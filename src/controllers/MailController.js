import utils from '../utils';
import mail from '../config/mail';
import LogController from './LogController';
import templateNews from '../templates/news';
import templateContact from '../templates/contact';
import templatePhysicalPerson from '../templates/physicalPerson';
import templateJuridicPerson from '../templates/juridicPerson';

class MailController {
  news(req, res) {
    const { name, phone } = req.body;
    if (!name || !phone) {
      LogController.log('Invalid: Empty name or phone.');
      return res.json({ success: false, message: 'Necessário preencher os campos de Nome e Telefone' });
    }
    mail.options.subject = `${name} deseja receber novidades`;
    mail.options.html = templateNews(name, phone);
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        LogController.log('Error sending news email: ' + error.toString());
        return res.json({ success: false, message: 'Ocorreu um erro ao salvar a solicitação' });
      }
      LogController.log(`News email sent successfully: ${info.response}`);
      return res.json({ success: true, message: 'A solicitação foi salva com sucesso' });
    })
  }

  contact(req, res) {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !phone || !email || !subject || !message) {
      LogController.log('Invalid: Empty name, email, phone, subject or message');
      return res.json({ success: false, message: 'Necessário preencher todos os campos' });
    }
    if (!utils.isEmail(email)) {
      LogController.log('Invalid email');
      return res.json({ success: false, message: 'O email informado é inválido' });
    }
    mail.options.subject = `${name} está solicitando contato`;
    mail.options.html = templateContact(name, email, phone, subject, message);
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        LogController.log('Error sending contact  email: ' + error.toString());
        return res.json({ success: false, message: 'Erro ao salvar solicitação' });
      }
      LogController.log(`Contact  email sent successfully: ${info.response}`);
      return res.json({ success: true, message: 'Solicitação salva com sucesso' });
    })
  }

  registerPF(req, res) {
    const { name, cpf, rg, dateBirth, address, neighborhood, city, state, cep, phone, ref1, telRef1, ref2, telRef2, ref3, telRef3, email } = req.body;
    if (!name || !cpf || !rg || !dateBirth || !address || !neighborhood || !city || !state || !cep || !phone || !ref1 || !telRef1 || !email) {
      LogController.log('Invalid: Empty fields');
      return res.json({ success: false, message: 'Todos os campos com * são obrigatórios' });
    }
    if (!utils.isEmail(email)) {
      LogController.log('Invalid email');
      return res.json({ success: false, message: 'O email informado é inválido' });
    }
    if (!utils.validateCpf(cpf)) {
      LogController.log('Invalid CPF');
      return res.json({ success: false, message: 'O CPF informado é inválido' });
    }
    mail.options.subject = `Novo Cadastro CPF - ${name}`;
    mail.options.html = templatePhysicalPerson(name, cpf, rg, dateBirth, address, neighborhood, city, state, cep, phone, ref1, telRef1, ref2, telRef2, ref3, telRef3, email);
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        LogController.log('Error sending register pf email: ' + error.toString());
        return res.json({ success: false, message: 'Ocorreu um erro ao realizar o cadastro de Pessoa Física' });
      }
      LogController.log(`Register pf email sent successfully: ${info.response}`);
      return res.json({ success: true, message: 'Cadastro realizado com sucesso' });
    })
  }

  registerPJ(req, res) {
    const { reason, cnpj, subscription, name, address, neighborhood, city, state, phone, ref1, telRef1, ref2, telRef2, ref3, telRef3, email } = req.body;
    if (!name || !reason || !cnpj || !subscription || !address || !neighborhood || !city || !state || !phone || !ref1 || !telRef1 || !email) {
      LogController.log('Invalid: Empty fields');
      return res.json({ success: false, message: 'Todos os campos com * são obrigatórios' });
    }
    if (!utils.isEmail(email)) {
      LogController.log('Invalid email');
      return res.json({ success: false, message: 'O email informado é inválido' });
    }
    mail.options.subject = `Novo Cadastro CNPJ - ${name}`;
    mail.options.html = templateJuridicPerson(name, reason, cnpj, subscription, address, neighborhood, city, state, phone, ref1, telRef1, ref2, telRef2, ref3, telRef3, email);
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        LogController.log('Error sending register pj email: ' + error.toString());
        return res.json({ success: false, message: 'Ocorreu um erro ao realizar o cadastro de Pessoa Jurídica' });
      }
      LogController.log(`Register pf email sent successfully: ${info.response}`);
      return res.json({ success: true, message: 'Cadastro realizado com sucesso' });
    })
  }

}

export default new MailController()