from http.server import BaseHTTPRequestHandler, HTTPServer
from selenium import webdriver  # type: ignore
from bs4 import BeautifulSoup  # type: ignore
from selenium.webdriver.support.ui import WebDriverWait  # type: ignore
from selenium.webdriver.common.by import By  # type: ignore
from selenium.webdriver.support import expected_conditions as EC  # type: ignore
from selenium.webdriver.chrome.options import Options  # type: ignore
from urllib.parse import urlparse, parse_qs
# using selenium because youtube dynamically loads the pages


def scrapedData(url):
    driver = webdriver.Chrome()
    chrome_options = Options()

    chrome_options.add_argument("--headless")

    driver.get(url)
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, "contents")))

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    parent = soup.find('div', id='contents')

    time = parent.find_all('div', class_='badge-shape-wiz__text')
    # total_minutes = 0
    print("total videos in the playlist are", len(time))
    total_seconds = sumOfDuration(time)

    return str(total_seconds)+","+str(len(time))

    driver.quit()


def sumOfDuration(time):

    totalSeconds = 0
    for i in time:

        duration = i.get_text()

        parts = duration.split(':')

        if len(parts) == 2:
            minutes = parts[0]
            seconds = parts[1]

            totalSeconds += int(minutes)*60 + int(seconds)

        if len(parts) == 3:
            hour = parts[0]
            minutes = parts[1]
            seconds = parts[2]

            totalSeconds += int(hour) * 3600 + int(minutes) * 60 + int(seconds)
    print("total seconds in the playlist is ", totalSeconds)
    return totalSeconds


def handle_root_request(request):
    request.send_response(200)
    request.send_header('Content-type', 'text/html')
    request.end_headers()
    message = "<html><body><h1>Health of the backend code is good</h1></body></html>"
    request.wfile.write(message.encode('utf-8'))


def handle_totalSeconds_request(request):
    request.send_response(200)
    request.send_header('Content-type', 'text/html')
    request.send_header('Access-Control-Allow-Origin', '*')
    request.end_headers()
    # getting the contents of the req.path
    #/totalseconds?url=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi
    parsed_path = urlparse(request.path)

    print("req path is :")
    print(request.path)
    
    query_params = parse_qs(parsed_path.query)
    #PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi
    print("query params : ",query_params)
    

    url = query_params.get('url', [''])[0]
    print(url)
    if not url:
        message = "No URL provided"
    else:
        message = str(scrapedData(
            "https://www.youtube.com/playlist?list=" + url))
    request.wfile.write(message.encode('utf-8'))


def handle_not_found(request):
    request.send_response(404)
    request.send_header('Content-type', 'text/html')
    request.send_header('Access-Control-Allow-Origin', '*')
    request.end_headers()
    message = "<html><body><h1>404 Not Found</h1></body></html>"
    request.wfile.write(message.encode('utf-8'))


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):

        if self.path == '/health':
            handle_root_request(self)
        elif self.path.startswith('/totalseconds'):
            handle_totalSeconds_request(self)
        else:
            handle_not_found(self)


def run_server():
    host = '0.0.0.0'
    port = 8585
    server_address = (host, port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)#SImpleHTTPRe...is the router
    print(f"Server started on http://{host}:{port}")
    httpd.serve_forever()


run_server()
#router it sends the request endpoints to their dedicated handler now what are handlers?....
#handlers are the entry point of any api.. responses are sent from handler only.