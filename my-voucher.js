async function sba(a, b, c) {
    let sout = "<h2 style='text-align:center'><b>Bắt đầu lưu voucher</b></h2><p style='text-align:center'><i>Tool của riêng bạn ❤️</i></p>";
    let myWindow = window.open("", "MsgWindow", "width=1000,height=1050");
    myWindow.document.write(`<b>${sout}</b><br>`);

    try {
        let promotion = a;
        let signature = b;
        let voucher_code = c;
        let url_post = "https://shopee.vn/api/v4/voucher_wallet/save_voucher";

        let data = `{"voucher_promotionid":${promotion},"signature":"${signature}","signature_source":"0"}`;

        let response = await fetch(url_post, {
            method: 'POST',
            headers: {
                'authority': 'shopee.vn',
                'accept': 'application/json',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
            },
            body: data
        });

        let set = await response.json();
        let error_msg = set.error_msg || "";
        let error = set.error;
        let time = new Date().toLocaleTimeString();

        if (!error_msg) {
            let remaining = 100 - (set.data?.voucher?.percentage_used || 0);
            sout = `${time} 🎉 CHÚC MỪNG! Đã lưu mã <b>${voucher_code}</b> thành công.<br>Còn lại: ${remaining}%`;
        } else if (error_msg.includes("đã lưu") || error_msg.includes("claimed")) {
            let remaining = 100 - (set.data?.voucher?.percentage_used || 0);
            sout = `${time} ⚠️ ${voucher_code} - ${error_msg} (Còn ${remaining}%)`;
        } else {
            sout = `${time} ❌ ${voucher_code} - ${error_msg}`;
        }

        myWindow.document.write(`<b>${sout}</b><br>`);

    } catch (err) {
        myWindow.document.write(`<b style="color:red">Lỗi: ${err.message}</b>`);
    }
}
