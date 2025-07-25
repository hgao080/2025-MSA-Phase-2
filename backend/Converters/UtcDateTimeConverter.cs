using System.Text.Json;
using System.Text.Json.Serialization;

namespace backend.Converters
{
    public class UtcDateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return DateTime.Parse(reader.GetString()!).ToUniversalTime();
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            // Ensure we always write DateTime as UTC with 'Z' suffix
            var utcValue = value.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(value, DateTimeKind.Utc) : value.ToUniversalTime();
            writer.WriteStringValue(utcValue.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"));
        }
    }

    public class NullableUtcDateTimeConverter : JsonConverter<DateTime?>
    {
        public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.Null)
                return null;
            
            return DateTime.Parse(reader.GetString()!).ToUniversalTime();
        }

        public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
        {
            if (value == null)
            {
                writer.WriteNullValue();
            }
            else
            {
                // Ensure we always write DateTime as UTC with 'Z' suffix
                var utcValue = value.Value.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(value.Value, DateTimeKind.Utc) : value.Value.ToUniversalTime();
                writer.WriteStringValue(utcValue.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"));
            }
        }
    }
}
