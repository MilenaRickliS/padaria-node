const express = require('express')
const server = express()

// Classe abstrata para pães
class Pao {
  constructor(id, name, image, price) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getImage() {
    return this.image;
  }

  getPrice() {
    return this.price;
  }
}

// Classe concreta para pão italiano
class PaoItaliano extends Pao {
  constructor(id, name, image, price) {
    super(id, name, image, price);
  }
}

// Classe concreta para pão mandioquinha
class PaoMandioquinha extends Pao {
  constructor(id, name, image, price) {
    super(id, name, image, price);
  }
}

// Classe concreta para pão frances
class PaoFrances extends Pao {
    constructor(id, name, image, price) {
      super(id, name, image, price);
    }
  }

  // Classe concreta para pão multigrão
class PaoMultigrao extends Pao {
    constructor(id, name, image, price) {
      super(id, name, image, price);
    }
}

// Classe concreta para pão integral
class PaoIntegral extends Pao {
    constructor(id, name, image, price) {
      super(id, name, image, price);
    }
  }

  // Classe concreta para pão linho
class PaoLinho extends Pao {
    constructor(id, name, image, price) {
      super(id, name, image, price);
    }
  }

  // Classe concreta para pão caseiro
class PaoCaseiro extends Pao {
    constructor(id, name, image, price) {
      super(id, name, image, price);
    }
  }

  // Classe concreta para pão de forma
class PaoDeForma extends Pao {
    constructor(id, name, image, price) {
      super(id, name, image, price);
    }
  }

  // Classe concreta para pão centeio
class PaoCenteio extends Pao {
    constructor(id, name, image, price) {
      super(id, name, image, price);
    }
  }

  // Classe concreta para pão ciabatta
class PaoCiabatta extends Pao {
    constructor(id, name, image, price) {
      super(id, name, image, price);
    }
  }

// Outras classes concretas para outros tipos de pães...

// Classe abstrata para fábricas de pães
class PaoFactory {
  createPao(id, name, image, price) {
    throw new Error("Método abstrato");
  }
}

// Classe concreta para fábrica de pão italiano
class PaoItalianoFactory extends PaoFactory {
  createPao(id, name, image, price) {
    return new PaoItaliano(id, name, image, price);
  }
}

// Classe concreta para fábrica de pão mandioquinha
class PaoMandioquinhaFactory extends PaoFactory {
  createPao(id, name, image, price) {
    return new PaoMandioquinha(id, name, image, price);
  }
}

// Classe concreta para fábrica de pão frances
class PaoFrancesFactory extends PaoFactory {
    createPao(id, name, image, price) {
      return new PaoFrances(id, name, image, price);
    }
  }

  // Classe concreta para fábrica de pão multigrçao
class PaoMultigraoFactory extends PaoFactory {
    createPao(id, name, image, price) {
      return new PaoMultigrao(id, name, image, price);
    }
  }

  // Classe concreta para fábrica de pão integral
class PaoIntegralFactory extends PaoFactory {
    createPao(id, name, image, price) {
      return new PaoIntegral(id, name, image, price);
    }
  }

  // Classe concreta para fábrica de pão linho
class PaoLinhoFactory extends PaoFactory {
    createPao(id, name, image, price) {
      return new PaoLinho(id, name, image, price);
    }
  }

  // Classe concreta para fábrica de pão caseiro
class PaoCaseiroFactory extends PaoFactory {
    createPao(id, name, image, price) {
      return new PaoCaseiro(id, name, image, price);
    }
  }

  // Classe concreta para fábrica de pão de forma
class PaoDeFormaFactory extends PaoFactory {
    createPao(id, name, image, price) {
      return new PaoDeForma(id, name, image, price);
    }
  }

  // Classe concreta para fábrica de pão centeio
class PaoCenteioFactory extends PaoFactory {
    createPao(id, name, image, price) {
      return new PaoCenteio(id, name, image, price);
    }
  }

  // Classe concreta para fábrica de pão ciabatta
class PaoCiabattaFactory extends PaoFactory {
    createPao(id, name, image, price) {
      return new PaoCiabatta(id, name, image, price);
    }
  }

const paoItalianoFactory = new PaoItalianoFactory();
const paoMandioquinhaFactory = new PaoMandioquinhaFactory();
const paoFrancesFactory = new PaoFrancesFactory();
const paoMultigraoFactory = new PaoMultigraoFactory();
const paoIntegralFactory = new PaoIntegralFactory();
const paoLinhoFactory = new PaoLinhoFactory();
const paoCaseiroFactory = new PaoCaseiroFactory();
const paoDeFormaFactory = new PaoDeFormaFactory();
const paoCenteioFactory = new PaoCenteioFactory();
const paoCiabattaFactory = new PaoCiabattaFactory();

const paes = [];

const paoItaliano = paoItalianoFactory.createPao(1, "Pão Italiano", "https://pubimg.band.uol.com.br/files/91cfe899a8842aec1cc7.png", 15.00);
paes.push(paoItaliano);

const paoMandioquinha = paoMandioquinhaFactory.createPao(2, "Pão Mandioquinha", "https://cknj.com.br/teste/wp-content/uploads/2022/06/Pao-Mandioquinha-01-1536x1154.jpg", 15.00);
paes.push(paoMandioquinha);

const paoFrances = paoFrancesFactory.createPao(3, "Pão Francês", "https://conteudo.imguol.com.br/c/entretenimento/45/2020/10/19/pao-frances---dona-deola-1603113166267_v2_300x400.jpg", 0.5);
paes.push(paoFrances);

const paoMultigrao = paoMultigraoFactory.createPao(4, "Pão Multigrão", "https://www.receitasagora.com.br/wp-content/uploads/2021/05/receita-de-pao-multigraos-1-430x305.jpg", 11.00);
paes.push(paoMultigrao);

const paoIntegral = paoIntegralFactory.createPao(5, "Pão Integral", "https://saborecia.com.br/wp-content/uploads/2020/07/pao-integral.jpg", 11.00);
paes.push(paoIntegral);

const paoLinho = paoLinhoFactory.createPao(6, "Pão de Linho", "https://melepimenta.com/wp-content/uploads/2024/02/Receita-pao-forma-integral-Baixa-5.jpg", 9.00);
paes.push(paoLinho);

const paoCaseiro = paoCaseiroFactory.createPao(7, "Pão Caseiro", "https://catracalivre.com.br/cdn-cgi/image/f=auto,q=60,w=640,h=360,fit=cover/wp-content/uploads/2019/08/paocaseiro-910x607.jpg", 4.50);
paes.push(paoCaseiro);

const paoDeForma = paoDeFormaFactory.createPao(8, "Pão de Forma", "https://panutti.com.br/resize/imagecache//d40af2ce78d32f5af427587c80c12a5e.JPG", 4.50);
paes.push(paoDeForma);

const paoCenteio = paoCenteioFactory.createPao(9, "Pão Centeio", "https://www.italianinhoalimentos.com.br/wp-content/uploads/2018/10/pao-centeio.jpg", 4.50);
paes.push(paoCenteio);

const paoCiabatta = paoCiabattaFactory.createPao(10, "Pão Ciabatta", "https://www.confeiteiradesucesso.com/wp-content/uploads/2019/03/paociabattarceita56.jpg.webp", 11.00);
paes.push(paoCiabatta);


server.get('/pao', (req, res) => {
  return res.json(paes.map((pao) => ({
    id: pao.getId(),
    name: pao.getName(),
    image: pao.getImage(),
    price: pao.getPrice(),
  })));
});


server.listen(8000, () => {
    console.log('servidor está funcionando ...')
})