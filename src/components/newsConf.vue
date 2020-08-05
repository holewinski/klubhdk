<template>
  <div>
    <form  @submit.prevent>
      <h2>Dodaj nowe wydarzenie</h2>
      <table>
        <tbody>
          <tr>
            <td>Tytuł:</td>
            <td><input v-model.lazy="article.title" id="er" type="text" /></td>
          </tr>
          <tr>
            <td>Data:</td>
          <td> <input v-model.lazy="article.date" type="date"/></td>
          </tr>
          <tr>
            <td>Opis:</td>
            <td>
              <div class="editor">
    <editor-menu-bar :editor="editor" >
      <div class="menubar" slot-scope="{ commands, isActive }">

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold" />
        </button> 
<button
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <font-awesome-icon icon="image" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
                    <font-awesome-icon icon="italic" />

        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
                    <font-awesome-icon icon="strikethrough" />

        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
                    <font-awesome-icon icon="underline" />

        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <font-awesome-icon icon="terminal" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
                    <font-awesome-icon icon="paragraph" />

        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
                    <font-awesome-icon icon="list-ul" />

        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
                   <font-awesome-icon icon="list-ol" />

        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
                   <font-awesome-icon icon="quote-right" />

        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <font-awesome-icon icon="code" />
        </button>

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
         -
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
                    <font-awesome-icon icon="undo" />

        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
                    <font-awesome-icon icon="redo" />

        </button>

      </div>
    </editor-menu-bar>

    <editor-content  class="editor__content" v-model.lazy="article.text" :editor="editor" />
  </div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="submit" @click.stop.prevent="send" value="Dodaj wydarzenie" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Image,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  name: "newsConf",
  data() {
    return {
      article: {},
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Image(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        onUpdate: ({ getHTML }) => {
          this.article.text = getHTML();
        },
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          
        `
      })
    };
  },

  // computed: {
  //   article() {
  //     return {
  //       title: this.title,
  //       text: this.editor.getHtml
  //     };
  //   }
  // },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    send() {
      if (!this.article.date) {
        this.article.date = this.$store.state.currentDate;
        firebase
          .firestore()
          .collection("news")
          .add(this.article);
      } else {
        firebase
          .firestore()
          .collection("news")
          .add(this.article);
      }
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>
