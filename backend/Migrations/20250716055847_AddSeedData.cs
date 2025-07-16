using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Project",
                columns: new[] { "Id", "AuthorId", "CreatedAt", "CurrentTeamSize", "Description", "EstimatedDuration", "Tag", "TeamSize", "Title" },
                values: new object[,]
                {
                    { 1, "2cc667eb-f438-40d3-9351-6198f624f188", new DateTime(2025, 6, 16, 12, 0, 0, 0, DateTimeKind.Utc), 1, "Build a cross-platform mobile app for online shopping with React Native", 12, 2, 4, "E-Commerce Mobile App" },
                    { 2, "582115f1-4f91-4b54-b91a-ac681e9a0b4c", new DateTime(2025, 6, 26, 12, 0, 0, 0, DateTimeKind.Utc), 2, "Develop an intelligent tutoring system using machine learning", 16, 1, 6, "AI-Powered Learning Platform" },
                    { 3, "2cc667eb-f438-40d3-9351-6198f624f188", new DateTime(2025, 7, 1, 12, 0, 0, 0, DateTimeKind.Utc), 1, "Create a comprehensive smart home automation system", 10, 2, 3, "IoT Smart Home System" }
                });

            migrationBuilder.InsertData(
                table: "ProjectRole",
                columns: new[] { "Id", "CreatedAt", "Description", "Filled", "ProjectId", "SkillsRequired", "Title" },
                values: new object[,]
                {
                    { "role-1", new DateTime(2025, 6, 16, 12, 0, 0, 0, DateTimeKind.Utc), "Develop user interface using React Native", false, 1, "[\"React Native\", \"JavaScript\", \"UI/UX Design\"]", "Frontend Developer" },
                    { "role-2", new DateTime(2025, 6, 16, 12, 0, 0, 0, DateTimeKind.Utc), "Build REST APIs and database architecture", false, 1, "[\"Node.js\", \"Express\", \"MongoDB\", \"API Design\"]", "Backend Developer" },
                    { "role-3", new DateTime(2025, 6, 16, 12, 0, 0, 0, DateTimeKind.Utc), "Set up CI/CD pipelines and cloud infrastructure", false, 1, "[\"AWS\", \"Docker\", \"CI/CD\", \"Kubernetes\"]", "DevOps Engineer" },
                    { "role-4", new DateTime(2025, 6, 26, 12, 0, 0, 0, DateTimeKind.Utc), "Develop machine learning models for personalized learning", false, 2, "[\"Python\", \"TensorFlow\", \"PyTorch\", \"Data Science\"]", "ML Engineer" },
                    { "role-5", new DateTime(2025, 6, 26, 12, 0, 0, 0, DateTimeKind.Utc), "Build web application with modern frameworks", true, 2, "[\"React\", \"Node.js\", \"TypeScript\", \"PostgreSQL\"]", "Full Stack Developer" },
                    { "role-6", new DateTime(2025, 6, 26, 12, 0, 0, 0, DateTimeKind.Utc), "Design data pipelines and analytics infrastructure", false, 2, "[\"Python\", \"Apache Spark\", \"SQL\", \"ETL\"]", "Data Engineer" },
                    { "role-7", new DateTime(2025, 7, 1, 12, 0, 0, 0, DateTimeKind.Utc), "Program microcontrollers and sensors", false, 3, "[\"C/C++\", \"Arduino\", \"Raspberry Pi\", \"Electronics\"]", "Embedded Systems Developer" },
                    { "role-8", new DateTime(2025, 7, 1, 12, 0, 0, 0, DateTimeKind.Utc), "Create mobile app for controlling smart home devices", false, 3, "[\"Flutter\", \"Dart\", \"IoT Protocols\", \"Mobile UI\"]", "Mobile App Developer" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProjectRole",
                keyColumn: "Id",
                keyValue: "role-1");

            migrationBuilder.DeleteData(
                table: "ProjectRole",
                keyColumn: "Id",
                keyValue: "role-2");

            migrationBuilder.DeleteData(
                table: "ProjectRole",
                keyColumn: "Id",
                keyValue: "role-3");

            migrationBuilder.DeleteData(
                table: "ProjectRole",
                keyColumn: "Id",
                keyValue: "role-4");

            migrationBuilder.DeleteData(
                table: "ProjectRole",
                keyColumn: "Id",
                keyValue: "role-5");

            migrationBuilder.DeleteData(
                table: "ProjectRole",
                keyColumn: "Id",
                keyValue: "role-6");

            migrationBuilder.DeleteData(
                table: "ProjectRole",
                keyColumn: "Id",
                keyValue: "role-7");

            migrationBuilder.DeleteData(
                table: "ProjectRole",
                keyColumn: "Id",
                keyValue: "role-8");

            migrationBuilder.DeleteData(
                table: "Project",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Project",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Project",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
