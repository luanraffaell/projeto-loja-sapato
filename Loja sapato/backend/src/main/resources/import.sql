insert into tb_forma_pagamento (id, descricao) values (1, 'Cartão de crédito');
insert into tb_forma_pagamento (id, descricao) values (2, 'Cartão de débito');
insert into tb_forma_pagamento (id, descricao) values (3, 'Dinheiro');

insert into tb_produto (nome, descricao, preco, ativo,img_url) values ('Nike shoes', 'Bom calçado', 150.90, 1, 'https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
insert into tb_produto (nome, descricao, preco, ativo, img_url) values ('Jordan', 'Muito caro', 1110.0, 1, 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Cibele','cibele@gmail.com','12345','0255222','ADMIN');