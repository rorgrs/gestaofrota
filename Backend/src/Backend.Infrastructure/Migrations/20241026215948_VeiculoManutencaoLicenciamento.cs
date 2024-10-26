using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class VeiculoManutencaoLicenciamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "veiculo_licenciamento",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_veiculo = table.Column<int>(type: "integer", nullable: false),
                    data_emissao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    data_validade = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    data_vencimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    VeiculoId = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_veiculo_licenciamento", x => x.id);
                    table.ForeignKey(
                        name: "FK_veiculo_licenciamento_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_veiculo_licenciamento_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_veiculo_licenciamento_veiculo_VeiculoId",
                        column: x => x.VeiculoId,
                        principalTable: "veiculo",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "veiculo_manutencao",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_veiculo = table.Column<int>(type: "integer", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false),
                    data_inicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_fim = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    observacao = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    diagnostico = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    VeiculoId = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_veiculo_manutencao", x => x.id);
                    table.ForeignKey(
                        name: "FK_veiculo_manutencao_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_veiculo_manutencao_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_veiculo_manutencao_veiculo_VeiculoId",
                        column: x => x.VeiculoId,
                        principalTable: "veiculo",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_licenciamento_id_usuario_alteracao",
                table: "veiculo_licenciamento",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_licenciamento_id_usuario_cadastro",
                table: "veiculo_licenciamento",
                column: "id_usuario_cadastro");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_licenciamento_VeiculoId",
                table: "veiculo_licenciamento",
                column: "VeiculoId");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_manutencao_id_usuario_alteracao",
                table: "veiculo_manutencao",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_manutencao_id_usuario_cadastro",
                table: "veiculo_manutencao",
                column: "id_usuario_cadastro");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_manutencao_VeiculoId",
                table: "veiculo_manutencao",
                column: "VeiculoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "veiculo_licenciamento");

            migrationBuilder.DropTable(
                name: "veiculo_manutencao");
        }
    }
}
