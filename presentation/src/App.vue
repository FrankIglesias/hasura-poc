<template>
  <div id="app">
    <div class="reveal">
      <div class="slides">
        <section>
          <h2> Hasura GraphQL</h2>
           <h2>by</h2>
           <h2>Francisco Iglesias 😁</h2>
        </section>
        <section>
          <section>
            <h2>What is Hasura?</h2>
            <p>
              The Hasura GraphQL Engine is a blazing-fast GraphQL server that
              gives you instant, realtime GraphQL APIs over Postgres, with
              webhook triggers on database events, and remote schemas for
              business logic.
            </p>
          </section>
        </section>
        <section>
          <section>
            <h1>Metadata files</h1>
          </section>
          <section>
            <p>actions.yaml</p>
            <pre><code>
              actions:
              - name: greet
                definition:
                  kind: ""
                  handler: localhost:3000/greet
                  forward_client_headers: true
                  headers:
                  - value: application/json
                    name: Content-Type
              custom_types:
                enums: []
                input_objects:
                - name: SampleInput
                objects:
                - name: SampleOutput
                scalars: []
          </code></pre>
          </section>
          <section>
            <p>actions.graphql</p>
            Defines the input / output format of the actions
            <pre><code>
              type Query {
                greet (
                  arg1: SampleInput!
                ): SampleOutput
              }
              input SampleInput {
                username : String!
              }
              type SampleOutput {
                greetings : String!
              }
            </code></pre>
          </section>
          <section>
            <p>allow_list.yaml</p>
            Whitelist of operations
          </section>
          <section>
            <p>cron_triggers.yaml</p>
            Yes you can run webhook triggers⏱
          </section>
          <section>
            <p>quey_collections.yaml</p>
            Define set of queries as a collection (e.g. to use in allow-list.yaml)
            <pre><code>
              - name: sample-collection
                definition:
                  queries:
                  - name: test
                    query: |-
                      query test {
                        books {
                          id
                          author_id
                          title
                        }
                      }
                  - name: test2
                    query: |-
                      query test2 {
                          authors{
                              id
                              author_name
                          }
                      }
        </code></pre>
          </section>
          <section>
            <p>remote_schemas.yaml</p>
            Add other graphql APIs that can feed yours
            <pre><code>
            - name: my-remote-schema
              definition:
                url: GRAPHQL_DEFINITION_URL
                timeout_seconds: 40
              </code></pre>
          </section>
          <section>
            <p>tables.yaml</p>
            List of tables from your DB
            <pre><code>
              - table:
                schema: public
                name: posts
              insert_permissions:
              - role: api
                permission:
                  check: {}
                  columns:
                  - title
                  - body
                  backend_only: false
              select_permissions:
              - role: api
                permission:
                  columns:
                  - id
                    ...
                  filter: {}
                  allow_aggregations: true
              update_permissions:
              - role: api
                permission:
                  columns:
                  - title
                  - body
                  filter: {}
                  check: {}
              delete_permissions:
              - role: api
                permission:
                  filter: {}
</code></pre>
          </section>
          <section>
            <p>version.yaml</p>
            Version of Hasura you are runnin
            <pre>
              <code>
                version: 2
              </code>
          </pre>
          </section>
        </section>
        <section>
          <section>
            <img src="./assets/diagram-1.png" alt="" height="400px" />
          </section>
          <section>
            <img src="./assets/diagram-2.png" alt="" height="400px" />
          </section>
          <section>
            <img src="./assets/diagram-3.png" alt="" height="400px" />
          </section>
        </section>
        <section>
          <h3>Before start...</h3>
          <ul>
            <li>Hasura has a cloud to host your instance and also supports docker</li>
            <li>Frontend is using React-admin that has a Hasura connector</li>
            <li>Database power by Supabase</li>
          </ul>
        </section>
        <section>
          <h3>Step 1</h3>
          <span>Run helper server</span>
        </section>
        <section>
          <h3>Step 2</h3>
          <pre><code>
            docker run -d -p 8080:8080 --env-file .env -v /Users/francisco/Desktop/hasura-poc/server/metadata:/metadata hasura/graphql-engine:v1.2.0.cli-migrations-v2
          </code></pre>
        </section>
        <section>
          <h3>Step 3</h3>
          <span>Run React client</span>
        </section>
        <section>
          <h1>Questions?</h1>
        </section>
        <section>
          <h1>Thanks!</h1>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Reveal from "reveal.js/js/reveal";

export default {
  name: "app",
  components: {},
  mounted() {
    Reveal.initialize({
      dependencies: [
        { src: "plugin/highlight/highlight.js", async: true },
        { src: "plugin/markdown/marked.js", async: true },
        { src: "plugin/markdown/markdown.js", async: true },
      ],
    });
  },
};
</script>

<style>
@import url("../node_modules/reveal.js/css/reveal.css");
@import url("../node_modules/reveal.js/css/theme/night.css");
@import url("../node_modules/reveal.js/lib/css/zenburn.css");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100vh;
}
</style>
