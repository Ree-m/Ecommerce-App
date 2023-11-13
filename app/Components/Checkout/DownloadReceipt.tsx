"use client"

export default function DownloadReceipt({ orderId }: { orderId: string }) {


    async function downloadReceipt() {
        try {
            const response = await fetch(`http://localhost:3000/api/dowloadReceipt/${orderId}`);
            const blob = await response.blob();
            
            // Create a download link and trigger the download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'receipt.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            // const responseData = await response.json()
            // if (responseData.ok){
            //     console.log("receipt dowloaded")

            // }

        } catch (error) {
            console.error('Error downloading receipt:', error);
        }
    }

    return (
        <div>
            <button onClick={downloadReceipt}>Download Receipt</button>

        </div>
    )

}

