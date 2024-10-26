using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    login = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    documento = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    senha = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    telefone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.id);
                    table.ForeignKey(
                        name: "FK_usuario_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_usuario_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "veiculo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    placa = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    marca = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    modelo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    cor = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    km_litro = table.Column<double>(type: "double precision", nullable: true),
                    ano = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_veiculo", x => x.id);
                    table.ForeignKey(
                        name: "FK_veiculo_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_veiculo_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_usuario_id_usuario_alteracao",
                table: "usuario",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_usuario_id_usuario_cadastro",
                table: "usuario",
                column: "id_usuario_cadastro");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_id_usuario_alteracao",
                table: "veiculo",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_id_usuario_cadastro",
                table: "veiculo",
                column: "id_usuario_cadastro");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "veiculo");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
