insert into tb_forma_pagamento (id, descricao) values (1, 'Cartão de crédito');
insert into tb_forma_pagamento (id, descricao) values (2, 'Cartão de débito');
insert into tb_forma_pagamento (id, descricao) values (3, 'Dinheiro');

/*seed produtos*/
insert into tb_produto_variacao (id,cor) values(1,'Preto');
insert into tb_produto_variacao (id,cor) values(2,'Azul');
insert into tb_produto_variacao (id,cor) values(3,'Vermelho');
insert into tb_produto_variacao (id,cor) values(4,'Roxo');
insert into tb_produto_variacao (id,cor) values(5,'Azul');

insert into tb_produto_tamanho (tamanho, variacao_id) values (25,1);
insert into tb_produto_tamanho (tamanho, variacao_id) values (35,1);
insert into tb_produto_tamanho (tamanho, variacao_id) values (36,1);
insert into tb_produto_tamanho (tamanho, variacao_id) values (37,1);
insert into tb_produto_tamanho (tamanho, variacao_id) values (40,2);
insert into tb_produto_tamanho (tamanho, variacao_id) values (41,2);
insert into tb_produto_tamanho (tamanho, variacao_id) values (42,2);
insert into tb_produto_tamanho (tamanho, variacao_id) values (32,3);
insert into tb_produto_tamanho (tamanho, variacao_id) values (42,3);
insert into tb_produto_tamanho (tamanho, variacao_id) values (38,4);
insert into tb_produto_tamanho (tamanho, variacao_id) values (39,4);
insert into tb_produto_tamanho (tamanho, variacao_id) values (40,4);
insert into tb_produto_tamanho (tamanho, variacao_id) values (40,5);

insert into tb_produto (id,nome, descricao, preco, ativo,img_url) values (1,'Nike shoes', 'Bom calçado', 150.90, 1, 'https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
insert into tb_produto (id,nome, descricao, preco, ativo, img_url) values (2,'Jordan', 'Muito caro', 1110.0, 1, 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
insert into tb_produto (id,nome, descricao, preco, ativo, img_url) values (3,'Tênis Olympikus Delta Masculino', 'Dia a dia', 129.99, 1, 'https://static.netshoes.com.br/produtos/tenis-olympikus-delta-masculino/44/2I2-5006-244/2I2-5006-244_zoom1.jpg?ts=1695700172&');

insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (1,1);
insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (4,1);
insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (2,2);
insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (3,2);
insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (5,3);
/*seed produtos*/

insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Cibele','cibele@gmail.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','0255222','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Luan','luan@gmail.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','2525252','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Teste ADMIN','admin@teste.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','2525252','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Teste VENDEDOR','vendedor@teste.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','2525252','VENDEDOR');