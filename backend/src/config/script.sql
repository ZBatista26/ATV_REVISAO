create table if not exists profissional_enderco (
id serial primary key not null,
id_profissional int,
cep varchar(8) not null,
logradouro varchar(100) not null,
numero varchar(7) not null,
complemento varchar(100) not null,
bairro varchar(100) not null,
localidade varchar(100) not null,
uf char(2) not null,
ponto_referencia varchar(100),
constraint fk_profissional foreign key (id_profissional) references profissional_profissional(id)
);

select * from profissional_endereco