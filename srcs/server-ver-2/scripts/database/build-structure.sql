create extension if not exists "uuid-ossp";
create table if not exists roles
(
    id          serial
    primary key,
    name        varchar(255)             not null,
    description text,
    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone not null
                              );


create table if not exists permissions
(
    id          serial
    primary key,
    name        varchar(255)             not null,
    description text,
    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone not null
                              );


create table if not exists product_thumbnail_2d
(
    data      bytea,
    alt_texts character varying[],
    id        serial
    primary key
);



create table if not exists profiles
(
    id       varchar(255) default uuid_generate_v4() not null
    primary key,
    provider varchar(255)                            not null,
    data     jsonb                                   not null
    );



create table if not exists templates
(
    id              serial
    primary key,
    name            varchar(255) not null,
    brief           text,
    description     text,
    object_type     varchar(255),
    template_type   varchar(255),
    number_of_likes integer,
    tag_labels      text[],
    version         varchar(255)
    );



create table if not exists merchants
(
    phone                          varchar(255),
    address                        text,
    slogan                         varchar(255),
    number_of_likes                integer                  default 0,
    number_of_products             integer                  default 0,
    created_at                     timestamp with time zone default now(),
    updated_at                     timestamp with time zone default now(),
    description                    text,
    name                           varchar
    constraint customers_name_key
    unique,
    id                             uuid                     default uuid_generate_v4() not null
    constraint customers_pkey
    primary key,
    avatar_id                      integer,
    email                          varchar(255)
    unique,
    using_template_profile_card_id integer
    references templates
                                             on delete set null
    );



create table if not exists users
(
    email       varchar(255)                                        not null
    unique,
    created_at  timestamp with time zone default now()              not null,
    updated_at  timestamp with time zone default now()              not null,
    id          uuid                     default uuid_generate_v4() not null
    primary key,
    profile_id  varchar
    constraint fk_users_profiles
    references profiles
                          on delete cascade,
    merchant_id uuid
    constraint fk_users_merchant_id
    references merchants
                          on delete cascade,
    first_login boolean                  default true
    );


create unique index users_email_index
    on users (email);

create index idx_user_email
    on users (email);

create index idx_customers_name
    on merchants (name);

create table if not exists social_links
(
    provider    varchar(255) not null,
    data        varchar(255) not null,
    id          serial
    primary key,
    merchant_id uuid         not null
    constraint fk_social_links_merchants
    references merchants
    on delete cascade,
    constraint unique_merchant_id_provider
    unique (merchant_id, provider)
    );

create table if not exists products
(
    id              serial  not null
    primary key,
    name            varchar not null,
    price           varchar,
    description     varchar,
    version         varchar,
    link            varchar,
    brief           varchar,
    date_release    date,
    highlight_label varchar,
    number_of_likes integer   default 0,
    merchant_id     uuid    not null
    constraint fk_products_merchants
    references merchants
    on delete cascade,
    created_at      timestamp default now(),
    updated_at      timestamp default now(),
    thumbnail_id    integer
    constraint fk_products_thumbnail_id
    references product_thumbnail_2d
    on delete cascade,
    constraint unique_merchant_id_name
    unique (merchant_id, name)
    );



create index idx_products_name
    on products (name);

create index idx_products_link
    on products (link);

create index idx_products_id
    on products (id);

create table if not exists product_features
(
    name        varchar not null,
    description varchar not null,
    product_id  integer not null
    constraint fk_product_features_product
    references products,
    id          serial
    primary key
);



create table if not exists avatar_2d
(
    id          serial not null
    constraint pk_merchant_avatar_2d
    primary key,
    data        bytea,
    merchant_id uuid   not null
    constraint fk_avatar_2d_merchant_id
    references merchants
    on delete cascade,
    alt_texts   text[]
);



alter table merchants
    add foreign key (avatar_id) references avatar_2d
        on update cascade on delete set null;

create table if not exists product_media_from_spline
(
    id         serial
    primary key,
    data       text,
    product_id integer not null
    constraint unique_product_id
    unique
    references products
    on delete cascade
);



create table if not exists users_like_products
(
    user_id    uuid    not null
    references users
    on update cascade on delete cascade,
    product_id integer not null
    references products
    on update cascade on delete cascade,
    primary key (user_id, product_id)
    );



create table if not exists merchants_have_templates
(
    merchant_id uuid    not null
    references merchants,
    template_id integer not null
    references templates,
    primary key (merchant_id, template_id)
    );


create table if not exists merchants_follow_merchants
(
    merchant_id uuid not null
    references merchants
    on delete cascade,
    follower_id uuid not null
    references merchants
    on delete cascade,
    primary key (merchant_id, follower_id)
    );



create table if not exists users_follow_merchants
(
    user_id     uuid not null
    references users
    on delete cascade,
    merchant_id uuid not null
    references merchants
    on delete cascade,
    primary key (user_id, merchant_id)
    );



