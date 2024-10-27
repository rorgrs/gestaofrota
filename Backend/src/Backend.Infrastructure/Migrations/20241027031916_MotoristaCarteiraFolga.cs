using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MotoristaCarteiraFolga : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "id_motorista",
                table: "veiculo",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "horario_inicio",
                table: "motorista_escala_trabalho",
                type: "text",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "horario_fim",
                table: "motorista_escala_trabalho",
                type: "text",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.CreateTable(
                name: "motorista_carteira",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_motorista = table.Column<int>(type: "integer", nullable: false),
                    cnh = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    data_vencimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_motorista_carteira", x => x.id);
                    table.ForeignKey(
                        name: "FK_motorista_carteira_motorista_id_motorista",
                        column: x => x.id_motorista,
                        principalTable: "motorista",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_motorista_carteira_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_motorista_carteira_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "motorista_folga",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_motorista = table.Column<int>(type: "integer", nullable: false),
                    data_inicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_fim = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    id_usuario_cadastro = table.Column<int>(type: "integer", nullable: true),
                    id_usuario_alteracao = table.Column<int>(type: "integer", nullable: true),
                    data_cadastro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_alteracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_motorista_folga", x => x.id);
                    table.ForeignKey(
                        name: "FK_motorista_folga_motorista_id_motorista",
                        column: x => x.id_motorista,
                        principalTable: "motorista",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_motorista_folga_usuario_id_usuario_alteracao",
                        column: x => x.id_usuario_alteracao,
                        principalTable: "usuario",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_motorista_folga_usuario_id_usuario_cadastro",
                        column: x => x.id_usuario_cadastro,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_veiculo_id_motorista",
                table: "veiculo",
                column: "id_motorista");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_carteira_id_motorista",
                table: "motorista_carteira",
                column: "id_motorista");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_carteira_id_usuario_alteracao",
                table: "motorista_carteira",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_carteira_id_usuario_cadastro",
                table: "motorista_carteira",
                column: "id_usuario_cadastro");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_folga_id_motorista",
                table: "motorista_folga",
                column: "id_motorista");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_folga_id_usuario_alteracao",
                table: "motorista_folga",
                column: "id_usuario_alteracao");

            migrationBuilder.CreateIndex(
                name: "IX_motorista_folga_id_usuario_cadastro",
                table: "motorista_folga",
                column: "id_usuario_cadastro");

            migrationBuilder.AddForeignKey(
                name: "FK_veiculo_motorista_id_motorista",
                table: "veiculo",
                column: "id_motorista",
                principalTable: "motorista",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_veiculo_motorista_id_motorista",
                table: "veiculo");

            migrationBuilder.DropTable(
                name: "motorista_carteira");

            migrationBuilder.DropTable(
                name: "motorista_folga");

            migrationBuilder.DropIndex(
                name: "IX_veiculo_id_motorista",
                table: "veiculo");

            migrationBuilder.DropColumn(
                name: "id_motorista",
                table: "veiculo");

            migrationBuilder.AlterColumn<DateTime>(
                name: "horario_inicio",
                table: "motorista_escala_trabalho",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<DateTime>(
                name: "horario_fim",
                table: "motorista_escala_trabalho",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
