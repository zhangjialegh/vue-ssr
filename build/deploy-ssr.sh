#!/bin/bash

zip dist.zip -r dist

############## beta.wehome.io ##############

scp dist.zip jiale@103.113.157.236:/tmp/

ssh jiale@103.113.157.236 << soff

sudo su

mv -f /tmp/dist.zip /srv/vue-ssr/

unzip -o /srv/vue-ssr/dist.zip -d /srv/vue-ssr

chown -R deploy /srv/vue-ssr/dist 

rm -f /srv/vue-ssr/dist.zip

exit

sudo su deploy

pm2 restart 0

exit

exit

soff

rm -f dist.zip
