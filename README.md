
# **Makers Clerk**

## **Check Out The Web Application !!**https://makerclerk.netlify.app/

### **Audience:** The audience for this website will be people in the maker community. The secondary audience would be anyone that needs a materials list to show others how to do their projects.
### **Definition Statement**: I want to create an application that provides an online solution for creating parts lists for maker projects.
### **How To Use** Enter Links for individual items you found on amazon.com on the create list page, you can check of preview of the list by clicking the preview link. Once complete you can export the list as a HTML file by clicking download list on the create list page.
### **Method** This fullstack application largely relies on the node package Puppeteer. Once links are entered they are sent to the backend and processed. The process opens a dummy browser to the link then gathers the applicable information. The information is then returned to generate the preview. Once download list is clicked, The backend generates a .html file and the frontend processes and downloads the blob object. Giving the user a file that has working links to their items. 
### **Known Limitations** The app cannot process all links on amazon yet. As of now items over the value of $1000.00 are problamatic. Since this project relys on Puppeteer, it creates a ram intensive instance of chrome. Due to hosting limitations, this process is slow. As this is a learning project, it is unlikely that more ram resources will ever be allocated to speed up the backend. Finally, not all links work but here are some that are known to work.  

  * https://www.amazon.com/dp/B07FY5R77T/ref=syn_sd_onsite_desktop_23?psc=1&uh_it=8468c8686fcb67687cc1b9c3568d7a2c_CT&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzSUtKSVlQRUNERFI1JmVuY3J5cHRlZElkPUEwMDUzODM0Mk1ORVRJV0ZaSExKJmVuY3J5cHRlZEFkSWQ9QTA5MDE4MTYzTEhSSkoyRUJYWTlLJndpZGdldE5hbWU9c2Rfb25zaXRlX2Rlc2t0b3AmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl
  * https://www.amazon.com/Raspberry-Model-2019-Quad-Bluetooth/dp/B07TC2BK1X/ref=sr_1_6?crid=1DL7JZCC6KXEZ&dchild=1&keywords=rasberry+pi+4%2B&qid=1628881246&sprefix=rasbe%2Caps%2C199&sr=8-6
  * https://www.amazon.com/AmazonBasics-Expanding-Organizer-Folder-Letter/dp/B01B25NN64/?_encoding=UTF8&pd_rd_w=Ev1jC&pf_rd_p=07a5b247-ecb0-424d-ae84-513fa82ec12d&pf_rd_r=DDNB1MK6NS5RY31DYQBJ&pd_rd_r=90381124-c495-4ce2-a8d0-d19aa332ae6b&pd_rd_wg=WDwfZ&ref_=pd_gw_HPBABJulyOfficeSupplies
  


