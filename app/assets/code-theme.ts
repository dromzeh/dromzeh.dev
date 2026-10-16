import type { ThemeRegistrationRaw } from "shiki";

const text = "var(--color-text)";
const body = "var(--color-body)";
const muted = "var(--code-punct)";
const comment = "var(--code-comment)";
const keyword = "var(--code-keyword)";
const fn = "var(--code-function)";
const type = "var(--code-type)";
const string = "var(--code-string)";
const literal = "var(--code-literal)";
const special = "var(--code-special)";

export const codeTheme: ThemeRegistrationRaw = {
  name: "dromzeh",
  type: "dark",
  colors: {
    "editor.background": "transparent",
    "editor.foreground": body,
  },
  settings: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: comment, fontStyle: "italic" } },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "punctuation.separator",
        "punctuation.terminator",
        "keyword.operator",
        "meta.tag punctuation.definition",
        "punctuation.definition.tag",
      ],
      settings: { foreground: muted },
    },
    {
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "keyword.other",
        "entity.name.tag",
        "support.type.primitive",
        "keyword.operator.new",
        "keyword.operator.expression",
      ],
      settings: { foreground: keyword },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function"],
      settings: { foreground: fn },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.class",
        "support.type",
        "entity.other.attribute-name",
        "variable.other.property",
        "variable.other.object.property",
        "meta.object-literal.key",
        "support.variable.property",
      ],
      settings: { foreground: type },
    },
    { scope: ["variable.language", "support.variable.language", "keyword.other.important"], settings: { foreground: special } },
    {
      scope: ["variable", "meta.definition.variable", "variable.parameter", "variable.other", "support.variable", "entity.name.variable"],
      settings: { foreground: text },
    },
    {
      scope: ["string", "string.quoted", "string.template", "punctuation.definition.string", "meta.embedded string"],
      settings: { foreground: string },
    },
    {
      scope: ["constant", "constant.numeric", "constant.language", "constant.character", "variable.other.constant", "support.constant", "keyword.other.unit"],
      settings: { foreground: literal },
    },
    { scope: ["punctuation.definition.template-expression", "punctuation.section.embedded"], settings: { foreground: muted } },
    { scope: ["meta.template.expression", "meta.embedded.line"], settings: { foreground: body } },
    { scope: ["markup.heading", "markup.bold"], settings: { foreground: text } },
    { scope: ["markup.inserted"], settings: { foreground: string } },
    { scope: ["markup.deleted"], settings: { foreground: literal } },
    { scope: ["invalid", "invalid.illegal"], settings: { foreground: literal } },
  ],
};
