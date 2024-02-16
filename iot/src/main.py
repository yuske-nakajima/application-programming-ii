import network
import machine
from time import sleep
import urequests
import ujson
import math
from settings import *


def connect():
    # WLANに接続
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)

    # 接続が完了するまで待機
    while not wlan.isconnected():
        print('Waiting for connection...')
        sleep(1)

    # IPアドレスを取得
    ip = wlan.ifconfig()[0]
    print(f'Connected on {ip}')


def post_data(url, temperature):
    # データをDICT型で宣言
    data = {
        "temperature": temperature
    }

    # jsonデータで送信するという事を明示的に宣言
    header = {
        'Content-Type': 'application/json'
    }

    # HTTPリクエストをPOSTとして送信
    res = urequests.post(
        url,
        data=ujson.dumps(data).encode("utf-8"),
        headers=header
    )

    print('response: ')
    print(res.json())

    # 終了
    res.close()


def get_temperature():
    VREF = 3.3
    R = 10000

    THERM_B = 3435
    THERM_To = 25
    THERM_Ro = 10000

    ADC_PIN = 0
    sensor = machine.ADC(ADC_PIN)

    value = sensor.read_u16()
    volt = value / 65536 * VREF
    temp = 0
    if volt != 0:
        Rx = ((VREF - volt) / volt) * R
        Xa = math.log(float(Rx) / float(THERM_Ro)) / float(THERM_B)
        Xb = 1 / (float(THERM_To) + 273.15)
        temp = (1 / (Xa + Xb)) - 273.15
        print("Temperature : {:.1f}C".format(temp))
    else:
        print("Not Connect Sensor.")

    return temp


def main():
    while True:
        try:
            # wifiにつなぐ
            connect()

            # 温度を計測
            temperature = get_temperature()

            # APIコール
            post_data(POST_URL, temperature)

            # 5分待機
            sleep(60 * 5)
        except KeyboardInterrupt:
            machine.reset()
            sleep(10)


if __name__ == "__main__":
    main()
