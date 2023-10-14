insert into tb_forma_pagamento (id, descricao) values (1, 'Cartão de crédito');
insert into tb_forma_pagamento (id, descricao) values (2, 'Cartão de débito');
insert into tb_forma_pagamento (id, descricao) values (3, 'Dinheiro');

insert into tb_produto (nome, descricao, preco, ativo,img_url) values ('Nike shoes', 'Bom calçado', 150.90, 1, 'https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
insert into tb_produto (nome, descricao, preco, ativo, img_url) values ('Jordan', 'Muito caro', 1110.0, 1, 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
insert into tb_produto (nome, descricao, preco, ativo, img_url) values ('Tênis Olympikus Delta Masculino', 'Dia a dia', 129.99, 1, 'https://static.netshoes.com.br/produtos/tenis-olympikus-delta-masculino/44/2I2-5006-244/2I2-5006-244_zoom1.jpg?ts=1695700172&');

insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Cibele','cibele@gmail.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','0255222','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Luan','luan@gmail.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','2525252','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Teste ADMIN','admin@teste.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','2525252','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Teste VENDEDOR','vendedor@teste.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','2525252','VENDEDOR');