#!/bin/bash
set -e

psql -v --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE SCHEMA test AUTHORIZATION postgres
EOSQL
