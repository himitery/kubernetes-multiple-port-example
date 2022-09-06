<div align='center'>
    <h1>Kubernetes multiple port example</h1>
</div>

```
Kubernetes 환경에서 REST API(3000) 포트와 gRPC(5000) 포트를 동시에 서비스하기 위한 예제입니다.

✔ 실제 서비스에 적용하기 전 Kubernetes 연습을 위해 작성하여, Kubernetes에 대한 이해도가 부족할 수 있습니다. 
```

## 1. Kubernetes 환경 구성하기 (minikube)

- **minikube**
    ```bash
    brew install minikube
    ```

- **kubectl**
    ```bash
    brew install kubectl
    ```

## 2. minikube 실행하기

```bash
minikube start --driver=docker 
```

```bash
minikube status
// minikube
// type: Control Plane
// host: Running
// kubelet: Running
// apiserver: Running
// kubeconfig: Configured
```

## 3. minikube에서 LoadBalancer 설정하기

- **metalb 활성화**
  ```bash
  minikube addons enable metallb
  ```

- **ip 확인**
  ```bash
  minikube ip
  // 192.168.49.2
  ```

- **metalb 설정**
  ```bash
  minikube addons configure metallb
  // -- Enter Load Balancer Start IP: # minikube ip
  // -- Enter Load Balancer End IP: # minikube ip
  //     ▪ Using image metallb/controller:v0.9.6
  //     ▪ Using image metallb/speaker:v0.9.6
  // ✅  metallb 이 성공적으로 설정되었습니다 
  ```

## 4. minikube에서 ingress 설정하기

- **ingress 활성화**
  ```bash
  minikube addons enable ingress 
  ```

- **ingress 접속 주소 확인**
  ```bash
  minikube service ingress-nginx-controller -n ingress-nginx --url
  // http://127.0.0.1:62796 # http
  // http://127.0.0.1:62797 # https
  ```

## 5. kubernetes 설정 파일 적용하기

```bash
kubectl apply -f k8s/deployments.yaml -f k8s/services.yaml -f k8s/ingress.yaml

kubectl get all
// NAME                                                    READY   STATUS              RESTARTS   AGE
// pod/kubernetes-multiple-port-example-7c5c99bc76-vv4vj   0/1     ContainerCreating   0          7s
// 
// NAME                                       TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)                         AGE
// service/kubernetes                         ClusterIP      10.96.0.1       <none>         443/TCP                         21m
// service/kubernetes-multiple-port-example   LoadBalancer   10.106.222.58   192.168.49.2   3000:32535/TCP,5000:30803/TCP   7s
// 
// NAME                                               READY   UP-TO-DATE   AVAILABLE   AGE
// deployment.apps/kubernetes-multiple-port-example   0/1     1            0           7s
// 
// NAME                                                          DESIRED   CURRENT   READY   AGE
// replicaset.apps/kubernetes-multiple-port-example-7c5c99bc76   1         1         0       7s
```

## 6. 접속 테스트하기

- **REST API 테스트**
  ```bash
  curl http://app.127.0.0.1.sslip.io:62796/api/health
  // true
  ```

- **gRPC 테스트**
  ```bash
  grpcurl -insecure grpc.127.0.0.1.sslip.io:62797 health.HealthService/HealthCheck 
  // {
  //   "status": true
  // }
  ```

### 참고 자료

- [쿠버네티스 안내서](https://subicura.com/k8s/)
