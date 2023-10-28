insert into tb_forma_pagamento (id, descricao) values (1, 'Cartão de crédito');
insert into tb_forma_pagamento (id, descricao) values (2, 'Cartão de débito');
insert into tb_forma_pagamento (id, descricao) values (3, 'Dinheiro');

/*seed produtos*/
insert into tb_produto_variacao (cor, img_url) values('Preto','https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
insert into tb_produto_variacao (cor,img_url) values('Azul','https://imgnike-a.akamaihd.net/768x768/02433115.jpg');
insert into tb_produto_variacao (cor,img_url) values('Vermelho','https://imgnike-a.akamaihd.net/768x768/024331ID.jpg');
insert into tb_produto_variacao (cor, img_url) values('Roxo','https://http2.mlstatic.com/D_NQ_NP_781467-MLB31673473847_082019-O.webp');
insert into tb_produto_variacao (cor,img_url) values('Azul','https://static.netshoes.com.br/produtos/tenis-olympikus-delta-masculino/88/2I2-5006-088/2I2-5006-088_zoom1.jpg?ts=1695700331&');

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

insert into tb_produto (nome, descricao, preco, ativo) values ('Nike shoes', 'Bom calçado', 150.90, 1);
insert into tb_produto (nome, descricao, preco, ativo, img_url) values ('Jordan', 'Muito caro', 1110.0, 1, 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
insert into tb_produto (nome, descricao, preco, ativo, img_url) values ('Tênis Olympikus Delta Masculino', 'Dia a dia', 129.99, 1, 'https://static.netshoes.com.br/produtos/tenis-olympikus-delta-masculino/44/2I2-5006-244/2I2-5006-244_zoom1.jpg?ts=1695700172&');

insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (1,1);
insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (4,1);
insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (2,2);
insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (3,2);
insert into tb_produto_cor_tamanho (cor_tamanho_id, produto_id) values (5,3);
/*seed produtos*/

insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Cibele','cibele@gmail.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','63239382350','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Luan','luan@gmail.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','02844461735','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Teste ADMIN','admin@teste.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','77329285552','ADMIN');
insert into tb_usuario(nome,email,senha,cpf,tipo_usuario) values ('Teste VENDEDOR','vendedor@teste.com','$2a$12$WJjtl//n1mH34nyJB2a9A.ECCbbCj7QqAQnO2oN.kW4xfHw4J9wRW','07787999217','VENDEDOR');