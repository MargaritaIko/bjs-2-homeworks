function cachingDecoratorNew(func) {
  let cache = [];
  function wrapper(...args) {
    let hash = args.join(',');
    let currentResult = cache.filter(cacheRecord => cacheRecord.hash === hash);
    if (currentResult.length === 1) {
        console.log('Из кэша: ' + currentResult[0].value);
        return 'Из кэша: ' + currentResult[0].value;
    } 
    else {
      let value = func.call(this, ...args);
      console.log('Вычисляем: ' + value);
      if (cache.length < 5) {   
        cache.push({hash, value});
      } 
      else {
        cache.unshift({hash, value});
        cache.pop();
      } 
      return 'Вычисляем: ' + value;
    }
  }
  return wrapper;
}

function debounceDecoratorNew(func, ms) {
  let timeout;
  func(...rest);
  let flag = true;
  return function (...rest) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (!flag) {
        func.call(this, ...rest); 
        flag = true;
      }
    }, ms);
  };   
}

function debounceDecorator2(debounceDecoratorNew) {
  let count = 0;
  function wrapper(...rest) {
    wrapper.history = count++;
    return debounceDecoratorNew.call(this, ...rest);
  }
  return wrapper;
}