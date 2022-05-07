import os
import sys
import datetime
import yaml

env = sys.argv[1]
print(env)

script_path = os.path.dirname(os.path.realpath(__file__))
with open(f"{script_path}/config.{env}.yml", "r") as ymlfile:
    config = yaml.safe_load(ymlfile)

now = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
app_name = config["app"]["name"]
app_root = config["app"]["root"]
source = config["app"]["source"]
s3_static = config["s3"]["bucket"]["static"]
s3_path = config["s3"]["bucket"]["path"]

print(f"now: {now}")
print(f"app_root: {app_root}")
print(f"s3_static: {s3_static}")

os.system(f"aws s3 sync {app_root}/{source}/ {s3_static}/{s3_path}/")

end = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
# print(f"Admin UI has beed deployed to https://s3.ap-northeast-2.amazonaws.com/test-pddetail-admin.lotteon.com/pilot/canvas-editor-offline/index.html")
# print(f"Admin UI has beed deployed to https://s3.ap-northeast-2.amazonaws.com/test-pddetail-admin.lotteon.com/pilot/canvas-editor-offline/index.html")
print(f"[FINISHED] Deployment Finished at {end}")
