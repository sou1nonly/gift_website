import Joi, { Schema, ObjectSchema } from "joi";

export interface FieldDefinition {
  key: string;
  type: "string" | "number" | "boolean" | "date" | "array" | "object";
  required?: boolean;
  min?: number;
  max?: number;
  regex?: string;
}

export function buildSchema(fields: FieldDefinition[]): ObjectSchema<any> {
  const schemaDefinition: Record<string, Schema> = {};

  fields.forEach((field) => {
    let fieldSchema: Schema;

    switch (field.type) {
      case "string":
        fieldSchema = Joi.string();
        break;
      case "number":
        fieldSchema = Joi.number();
        break;
      case "boolean":
        fieldSchema = Joi.boolean();
        break;
      case "date":
        fieldSchema = Joi.date();
        break;
      case "array":
        fieldSchema = Joi.array();
        break;
      case "object":
        fieldSchema = Joi.object();
        break;
      default:
        throw new Error(`Unsupported field type: ${field.type}`);
    }

    if (field.required) {
      fieldSchema = fieldSchema.required();
    } else {
      fieldSchema = fieldSchema.optional();
    }

    if (field.min !== undefined) {
      fieldSchema = (fieldSchema as any).min(field.min);
    }

    if (field.max !== undefined) {
      fieldSchema = (fieldSchema as any).max(field.max);
    }

    if (field.regex) {
      fieldSchema = (fieldSchema as Joi.StringSchema).pattern(new RegExp(field.regex));
    }

    schemaDefinition[field.key] = fieldSchema;
  });

  return Joi.object(schemaDefinition);
}