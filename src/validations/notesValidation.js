import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";
import { TAGS } from "../contants/tags.js";

// ---- Custom ID validator ----
const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message("Invalid id format");
  }
  return value;
};

// ---- Create Note Schema ----
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        "string.base": "Title must be a string",
        "string.min": "Title should have at least {#limit} characters",
        "string.max": "Title should have at most {#limit} characters",
        "any.required": "Title is required",
      }),

    content: Joi.string()
      .min(10)
      .max(500)
      .required()
      .messages({
        "string.base": "Content must be a string",
        "string.min": "Content should have at least {#limit} characters",
        "string.max": "Content should have at most {#limit} characters",
        "any.required": "Content is required",
      }),

    tag: Joi.string()
      .valid(...TAGS)   
      .default("Todo")
      .required()
      .messages({
        "any.only": "Tag must be one of the allowed values",
        "any.required": "Tag is required",
      }),
  }),
};

// ---- Note ID param ----
export const noteIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

// ---- Update Note ----
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        "string.base": "Title must be a string",
        "string.min": "Title should have at least {#limit} characters",
        "string.max": "Title should have at most {#limit} characters",
        "any.required": "Title is required",
      }),

    content: Joi.string()
      .min(10)
      .max(500)
      .required()
      .messages({
        "string.base": "Content must be a string",
        "string.min": "Content should have at least {#limit} characters",
        "string.max": "Content should have at most {#limit} characters",
        "any.required": "Content is required",
      }),

    tag: Joi.string()
      .valid(...TAGS)
      .default("Todo")
      .required()
      .messages({
        "any.only": "Tag must be one of the allowed values",
        "any.required": "Tag is required",
      }),

    onDuty: Joi.boolean()
      .default(false)
      .messages({
        "boolean.base": "onDuty must be a boolean value",
      }),
  }),
};

// ---- Get Notes (pagination) ----
export const getNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(15),
  }),
};
