using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Viagem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "viagem",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_veiculo = table.Column<int>(type: "integer", nullable: false),
                    lat_origem = table.Column<double>(type: "double precision", nullable: false),
                    lng_origem = table.Column<double>(type: "double precision", nullable: false),
                    ibge_cidade_origem = table.Column<int>(type: "integer", nullable: false),
                    logradouro_origem = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    lat_destino = table.Column<double>(type: "double precision", nullable: false),
                    lng_destino = table.Column<double>(type: "double precision", nullable: false),
                    ibge_cidade_destino = table.Column<int>(type: "integer", nullable: false),
                    logradouro_destino = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_viagem", x => x.id);
                    table.ForeignKey(
                        name: "FK_viagem_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_viagem_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_viagem_veiculo_id_veiculo",
                        column: x => x.id_veiculo,
                        principalTable: "veiculo",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "viagem_parada",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_viagem = table.Column<int>(type: "integer", nullable: false),
                    lat = table.Column<double>(type: "double precision", nullable: false),
                    lng = table.Column<double>(type: "double precision", nullable: false),
                    ibge_cidade = table.Column<int>(type: "integer", nullable: true),
                    logradouro = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_viagem_parada", x => x.id);
                    table.ForeignKey(
                        name: "FK_viagem_parada_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_viagem_parada_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_viagem_parada_viagem_id_viagem",
                        column: x => x.id_viagem,
                        principalTable: "viagem",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_viagem_id_usuario_alteracao",
                table: "viagem",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_viagem_id_usuario_cadastro",
                table: "viagem",
                column: "id_usuario_cadastro");

            migrationBuilder.CreateIndex(
                name: "IX_viagem_id_veiculo",
                table: "viagem",
                column: "id_veiculo");

            migrationBuilder.CreateIndex(
                name: "IX_viagem_parada_id_usuario_alteracao",
                table: "viagem_parada",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_viagem_parada_id_usuario_cadastro",
                table: "viagem_parada",
                column: "id_usuario_cadastro");

            migrationBuilder.CreateIndex(
                name: "IX_viagem_parada_id_viagem",
                table: "viagem_parada",
                column: "id_viagem");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "viagem_parada");

            migrationBuilder.DropTable(
                name: "viagem");
        }
    }
}
