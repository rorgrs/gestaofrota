using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Motorista : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_veiculo_licenciamento_veiculo_VeiculoId",
                table: "veiculo_licenciamento");

            migrationBuilder.DropForeignKey(
                name: "FK_veiculo_manutencao_veiculo_VeiculoId",
                table: "veiculo_manutencao");

            migrationBuilder.DropIndex(
                name: "IX_veiculo_manutencao_VeiculoId",
                table: "veiculo_manutencao");

            migrationBuilder.DropIndex(
                name: "IX_veiculo_licenciamento_VeiculoId",
                table: "veiculo_licenciamento");

            migrationBuilder.DropColumn(
                name: "VeiculoId",
                table: "veiculo_manutencao");

            migrationBuilder.DropColumn(
                name: "VeiculoId",
                table: "veiculo_licenciamento");

            migrationBuilder.CreateTable(
                name: "motorista_escala_trabalho",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    horario_inicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    horario_fim = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_motorista_escala_trabalho", x => x.id);
                    table.ForeignKey(
                        name: "FK_motorista_escala_trabalho_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_motorista_escala_trabalho_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "motorista",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_escala_trabalho = table.Column<int>(type: "integer", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: false),
                    documento = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    data_nascimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    celular = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    email = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    status_treinamento = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_motorista", x => x.id);
                    table.ForeignKey(
                        name: "FK_motorista_motorista_escala_trabalho_id_escala_trabalho",
                        column: x => x.id_escala_trabalho,
                        principalTable: "motorista_escala_trabalho",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_motorista_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_motorista_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_manutencao_id_veiculo",
                table: "veiculo_manutencao",
                column: "id_veiculo");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_licenciamento_id_veiculo",
                table: "veiculo_licenciamento",
                column: "id_veiculo");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_id_escala_trabalho",
                table: "motorista",
                column: "id_escala_trabalho");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_id_usuario_alteracao",
                table: "motorista",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_id_usuario_cadastro",
                table: "motorista",
                column: "id_usuario_cadastro");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_escala_trabalho_id_usuario_alteracao",
                table: "motorista_escala_trabalho",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_escala_trabalho_id_usuario_cadastro",
                table: "motorista_escala_trabalho",
                column: "id_usuario_cadastro");

            migrationBuilder.AddForeignKey(
                name: "FK_veiculo_licenciamento_veiculo_id_veiculo",
                table: "veiculo_licenciamento",
                column: "id_veiculo",
                principalTable: "veiculo",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_veiculo_manutencao_veiculo_id_veiculo",
                table: "veiculo_manutencao",
                column: "id_veiculo",
                principalTable: "veiculo",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_veiculo_licenciamento_veiculo_id_veiculo",
                table: "veiculo_licenciamento");

            migrationBuilder.DropForeignKey(
                name: "FK_veiculo_manutencao_veiculo_id_veiculo",
                table: "veiculo_manutencao");

            migrationBuilder.DropTable(
                name: "motorista");

            migrationBuilder.DropTable(
                name: "motorista_escala_trabalho");

            migrationBuilder.DropIndex(
                name: "IX_veiculo_manutencao_id_veiculo",
                table: "veiculo_manutencao");

            migrationBuilder.DropIndex(
                name: "IX_veiculo_licenciamento_id_veiculo",
                table: "veiculo_licenciamento");

            migrationBuilder.AddColumn<int>(
                name: "VeiculoId",
                table: "veiculo_manutencao",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VeiculoId",
                table: "veiculo_licenciamento",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_manutencao_VeiculoId",
                table: "veiculo_manutencao",
                column: "VeiculoId");

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_licenciamento_VeiculoId",
                table: "veiculo_licenciamento",
                column: "VeiculoId");

            migrationBuilder.AddForeignKey(
                name: "FK_veiculo_licenciamento_veiculo_VeiculoId",
                table: "veiculo_licenciamento",
                column: "VeiculoId",
                principalTable: "veiculo",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_veiculo_manutencao_veiculo_VeiculoId",
                table: "veiculo_manutencao",
                column: "VeiculoId",
                principalTable: "veiculo",
                principalColumn: "id");
        }
    }
}
