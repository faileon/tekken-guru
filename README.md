# old
1. ng build --prod
1. firebase deploy
---
# new
1. ng build --configuration production
1. firebase deploy


# tekken 8
1. `firebase login`
1. multi instance database. manage firebase deployment rules with: `firebase deploy --only firestore:tekken8`
## firebase-admin
1. set env for terminal session: `$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Projects\tekkenguru\web\firebase-service-account.json"`
1. confirm its set: `echo $env:GOOGLE_APPLICATION_CREDENTIALS`
1. run parser tool `npx ts-node ./tools/parser.ts`
