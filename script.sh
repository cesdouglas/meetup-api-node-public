echo 'requesting all hookahs'
curl localhost:3000/hookahs

echo
echo

echo 'requesting one hookah'
curl localhost:3000/hookahs/1

echo
echo

echo 'requesting with wrong body'
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/hookahs

echo
echo

echo 'creating Marajah'
CREATE=$(curl --silent -X POST \
    --data-binary '{"brand": "Marajah", "model": "Umbrella", "color": "Dourado", "size": "G"}' \
    localhost:3000/hookahs)

echo $CREATE

ID=$(echo $CREATE | jq .id)

echo
echo

echo 'requesting Marajah'
curl localhost:3000/hookahs/$ID