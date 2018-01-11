import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  usuario: any = {
    nome: 'Gustavo',
    emai: 'gustavo@email.com'
  }

  onSubmit(formulario){
    console.log(formulario);
    // console.log(this.usuario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
    .map(res => res)
    .subscribe(dados => {
      console.log(dados);
      formulario.form.reset();
    }
  );

  }

  constructor(private http: Http) { }

  ngOnInit() {
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo){
    return {
    'has-error': this.verificaValidTouched(campo),
    'has-feeback': this.verificaValidTouched(campo)

     // 'has-error': !campo.valid && campo.touched",
     // 'has-feeback': !campo.valid && campo.touched"
    }
  }

  consultaCEP(cep, form){
    console.log(cep);

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep != "") {

      // Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDados(form);

        this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
        .map(dados => dados.json())
        .subscribe(dados => this.populaDadosForm(dados, form));
      }
  }
}

populaDadosForm(dados, formulario){
  /*formulario.setValue({
    nome: formulario.value.nome,
    email: formulario.value.email,
    endereco: {
      rua: dados.logradouro,
      cep: dados.cep,
      numero: '',
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    }
  });*/

formulario.form.patchValue({
  endereco: {
    rua: dados.logradouro,
    // cep: dados.cep,
    complemento: dados.complemento,
    bairro: dados.bairro,
    cidade: dados.localidade,
    estado: dados.uf
  }
});

// console.log(form);

}
resetaDados(formulario){
  formulario.form.patchValue({
    endereco: {
      rua: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null
    }
  });
}

}
