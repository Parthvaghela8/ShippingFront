function submitBid(shipmentId, bidAmount) {
    fetch('http://54.220.202.86:8080/api/bids/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shipmentId: shipmentId,
            bidAmount: bidAmount,
            shipperId:1,
            bidTime: new Date(),
            bidStatus: "pending",

        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Bid placed successfully');
            openModal('Bid placed successfully!');
            // Optionally, you can update the UI to reflect the bid placement
        } else {
            console.error('Failed to place bid');
            // Handle error if needed
        }
    })
    .catch(error => console.error('Error placing bid:', error));
}