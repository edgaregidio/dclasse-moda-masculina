const utils = require("../utils");
const mail = require("../config/mail");
const templateNews = require("../templates/news");
const templateContact = require("../templates/contact");
const templatePhysicalPerson = require("../templates/physicalPerson");
const templateJuridicPerson = require("../templates/juridicPerson");
const { logNews, logCadastros, logContatos } = require("../config/log");

class MailController {
  news(req, res) {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.json({
        success: false,
        message: "Necessário preencher os campos de Nome e Telefone",
      });
    }

    const obj = { name, phone };

    logNews.info(JSON.stringify(obj));

    mail.options.subject = `${name} deseja receber novidades`;
    mail.options.html = templateNews(name, phone);
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        logNews.info("Error sending news email: " + error.toString());
        return res.json({
          success: false,
          message: "Ocorreu um erro ao salvar a solicitação",
        });
      }
      logNews.info(`News email sent successfully: ${info.response}`);
      return res.json({
        success: true,
        message: "A solicitação foi salva com sucesso",
      });
    });
  }

  contact(req, res) {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !phone || !email || !subject || !message) {
      return res.json({
        success: false,
        message: "Necessário preencher todos os campos",
      });
    }

    const obj = { name, email, phone, subject, message };

    logContatos.info(JSON.stringify(obj));

    if (!utils.isEmail(email)) {
      return res.json({
        success: false,
        message: "O email informado é inválido",
      });
    }

    mail.options.subject = `${name} está solicitando contato`;
    mail.options.html = templateContact(name, email, phone, subject, message);
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        logContatos.info("Error sending contact  email: " + error.toString());
        return res.json({
          success: false,
          message: "Erro ao salvar solicitação",
        });
      }
      logContatos.info(`Contact  email sent successfully: ${info.response}`);
      return res.json({
        success: true,
        message: "Solicitação salva com sucesso",
      });
    });
  }

  registerPF(req, res) {
    const {
      name,
      cpf,
      rg,
      dateBirth,
      address,
      neighborhood,
      city,
      state,
      cep,
      phone,
      ref1,
      telRef1,
      ref2,
      telRef2,
      ref3,
      telRef3,
      email,
    } = req.body;
    if (
      !name ||
      !cpf ||
      !rg ||
      !dateBirth ||
      !address ||
      !neighborhood ||
      !city ||
      !state ||
      !cep ||
      !phone ||
      !ref1 ||
      !telRef1 ||
      !email
    ) {
      return res.json({
        success: false,
        message: "Todos os campos com * são obrigatórios",
      });
    }
    if (!utils.isEmail(email)) {
      return res.json({
        success: false,
        message: "O email informado é inválido",
      });
    }
    if (!utils.validateCpf(cpf)) {
      return res.json({
        success: false,
        message: "O CPF informado é inválido",
      });
    }

    const obj = {
      name,
      cpf,
      rg,
      dateBirth,
      address,
      neighborhood,
      city,
      state,
      cep,
      phone,
      ref1,
      telRef1,
      ref2,
      telRef2,
      ref3,
      telRef3,
      email,
    };
    logCadastros.info(JSON.stringify(obj));

    mail.options.subject = `Novo Cadastro CPF - ${name}`;
    mail.options.html = templatePhysicalPerson(
      name,
      cpf,
      rg,
      dateBirth,
      address,
      neighborhood,
      city,
      state,
      cep,
      phone,
      ref1,
      telRef1,
      ref2,
      telRef2,
      ref3,
      telRef3,
      email
    );
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        logCadastros.info(
          "Error sending register pf email: " + error.toString()
        );
        return res.json({
          success: false,
          message: "Ocorreu um erro ao realizar o cadastro de Pessoa Física",
        });
      }
      logCadastros.info(
        `Register pf email sent successfully: ${info.response}`
      );
      return res.json({
        success: true,
        message: "Cadastro realizado com sucesso",
      });
    });
  }

  registerPJ(req, res) {
    const {
      reason,
      cnpj,
      subscription,
      name,
      address,
      neighborhood,
      city,
      state,
      phone,
      ref1,
      telRef1,
      ref2,
      telRef2,
      ref3,
      telRef3,
      email,
    } = req.body;
    if (
      !name ||
      !reason ||
      !cnpj ||
      !subscription ||
      !address ||
      !neighborhood ||
      !city ||
      !state ||
      !phone ||
      !ref1 ||
      !telRef1 ||
      !email
    ) {
      return res.json({
        success: false,
        message: "Todos os campos com * são obrigatórios",
      });
    }
    if (!utils.isEmail(email)) {
      return res.json({
        success: false,
        message: "O email informado é inválido",
      });
    }

    const obj = {
      reason,
      cnpj,
      subscription,
      name,
      address,
      neighborhood,
      city,
      state,
      phone,
      ref1,
      telRef1,
      ref2,
      telRef2,
      ref3,
      telRef3,
      email,
    };

    logCadastros.info(JSON.stringify(obj));

    mail.options.subject = `Novo Cadastro CNPJ - ${name}`;
    mail.options.html = templateJuridicPerson(
      name,
      reason,
      cnpj,
      subscription,
      address,
      neighborhood,
      city,
      state,
      phone,
      ref1,
      telRef1,
      ref2,
      telRef2,
      ref3,
      telRef3,
      email
    );
    mail.transporter.close();
    mail.transporter.sendMail(mail.options, (error, info) => {
      if (error) {
        logCadastros.info(
          "Error sending register pj email: " + error.toString()
        );
        return res.json({
          success: false,
          message: "Ocorreu um erro ao realizar o cadastro de Pessoa Jurídica",
        });
      }
      logCadastros.info(
        `Register pf email sent successfully: ${info.response}`
      );

      return res.json({
        success: true,
        message: "Cadastro realizado com sucesso",
      });
    });
  }
}

module.exports = new MailController();
