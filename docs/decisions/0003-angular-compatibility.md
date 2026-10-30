# ADR 0003: Angular compatibility

Status: accepted

Develop on Angular 22. Test Angular 21 in a separately generated consumer with
its compatible TypeScript compiler before advertising support. Public component
source avoids workspace aliases and Angular APIs not present in 21 where doing so
does not compromise the Angular 22 design. Compatibility is evidence, not a broad
peer range claim.
